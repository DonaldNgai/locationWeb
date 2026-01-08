'use server';

import { prisma } from '@/lib/db/prisma';
import type { Prisma } from '@prisma/client';
import {
  getApiInternalApiKeys,
  postApiInternalApiKeys,
  deleteApiInternalApiKeysKeyId,
  type GetApiInternalApiKeys200,
  type PostApiInternalApiKeys201,
} from '@/lib/generated/api';
import { executeApiCall, requireAuth, type ApiError } from '@/lib/api/client';

type UserWithGroup = Prisma.UserGetPayload<{
  include: {
    groupMemberships: {
      include: {
        group: true;
      };
    };
  };
}>;

/**
 * Common function to find or ensure user has an active group
 */
async function findOrEnsureUserWithActiveGroup(
  userEmail: string,
  userName: string | null
): Promise<{ dbUser: UserWithGroup; groupId: string }> {
  let dbUser: UserWithGroup | null = await prisma.user.findUnique({
    where: { email: userEmail },
    include: {
      groupMemberships: {
        where: { status: 'active' },
        include: { group: true },
      },
    },
  });

  let groupId: string;

  if (!dbUser) {
    const newGroup = await prisma.group.create({
      data: { name: `${userName || userEmail}'s Group`, ownerId: '' },
    });

    const newUser = await prisma.user.create({
      data: {
        email: userEmail,
        name: userName,
        groupMemberships: { create: { groupId: newGroup.id, status: 'active' } },
      },
      include: {
        groupMemberships: {
          where: { status: 'active' },
          include: { group: true },
        },
      },
    });

    await prisma.group.update({ where: { id: newGroup.id }, data: { ownerId: newUser.id } });
    dbUser = newUser;
    groupId = newGroup.id;
  } else {
    const activeGroup = dbUser.groupMemberships.find((m) => m.status === 'active')?.group;
    if (activeGroup) {
      groupId = activeGroup.id;
    } else {
      const newGroup = await prisma.group.create({
        data: { name: `${dbUser.name || dbUser.email}'s Group`, ownerId: dbUser.id },
      });

      await prisma.groupMember.create({
        data: { groupId: newGroup.id, userId: dbUser.id, status: 'active' },
      });

      groupId = newGroup.id;

      const refreshedUser = await prisma.user.findUnique({
        where: { email: userEmail },
        include: {
          groupMemberships: {
            where: { status: 'active' },
            include: { group: true },
          },
        },
      });

      if (!refreshedUser) throw new Error('Failed to refresh user after creating group membership');
      dbUser = refreshedUser;
    }
  }

  if (!dbUser) throw new Error('User not found after creation/update');
  return { dbUser, groupId };
}

export type Group = {
  id: string;
  name: string;
  description: string | null;
};

export type GetUserGroupsResult = {
  groups?: Group[];
  error?: string;
  status?: number;
};

export type CreateGroupResult = {
  group?: Group;
  error?: string;
  status?: number;
};

export type GetApiKeysResult = {
  items?: GetApiInternalApiKeys200['items'];
  error?: string;
  status?: number;
};

export type CreateApiKeyResult = {
  apiKey?: string;
  id?: string;
  label?: string;
  error?: string;
  status?: number;
  created?: number;
};

export type DeleteApiKeyResult = {
  success?: boolean;
  error?: string;
  status?: number;
};

/**
 * Server action to create a new group for the user
 */
export async function createGroup(name: string, description?: string): Promise<CreateGroupResult> {
  try {
    const authResult = await requireAuth();
    if ('error' in authResult) return authResult;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return { error: 'Group name is required', status: 400 };
    }

    let dbUser = await prisma.user.findUnique({ where: { email: authResult.user.email } });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: { email: authResult.user.email, name: authResult.user.name },
      });
    }

    const newGroup = await prisma.group.create({
      data: { name: name.trim(), description: description?.trim() || null, ownerId: dbUser.id },
    });

    await prisma.groupMember.create({
      data: { groupId: newGroup.id, userId: dbUser.id, status: 'active' },
    });

    return {
      group: {
        id: newGroup.id,
        name: newGroup.name,
        description: newGroup.description,
      },
    };
  } catch (error) {
    console.error('Error creating group:', error);
    return { error: 'Internal server error', status: 500 };
  }
}

/**
 * Server action to fetch user's active groups
 */
export async function getUserGroups(): Promise<GetUserGroupsResult> {
  try {
    const authResult = await requireAuth();
    if ('error' in authResult) return authResult;

    const dbUser = await prisma.user.findUnique({
      where: { email: authResult.user.email },
      include: {
        groupMemberships: {
          where: { status: 'active' },
          include: { group: true },
        },
      },
    });

    if (!dbUser) return { groups: [] };

    return {
      groups: dbUser.groupMemberships.map((m) => ({
        id: m.group.id,
        name: m.group.name,
        description: m.group.description,
      })),
    };
  } catch (error) {
    console.error('Error fetching user groups:', error);
    return { error: 'Internal server error', status: 500 };
  }
}

/**
 * Server action to fetch API keys for the authenticated user's groups
 */
export async function getApiKeys(): Promise<GetApiKeysResult> {
  try {
    const result = await executeApiCall<GetApiInternalApiKeys200>(
      (config) => getApiInternalApiKeys(undefined, config)
    );
    if (!result.success) return result.error;
    return { items: result.data.items || [] };
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return { error: 'Internal server error', status: 500 };
  }
}

/**
 * Server action to delete an API key
 */
export async function deleteApiKey(id: string): Promise<DeleteApiKeyResult> {
  try {
    const authResult = await requireAuth();
    if ('error' in authResult) return authResult;

    if (!id || typeof id !== 'string' || !id.trim()) {
      return { error: 'API key ID is required', status: 400 };
    }

    const result = await executeApiCall((config) => deleteApiInternalApiKeysKeyId(id.trim(), config));
    if (!result.success) return result.error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting API key:', error);
    return { error: 'Internal server error', status: 500 };
  }
}

/**
 * Server action to create a new API key
 */
export async function createApiKey(
  label: string,
  groupIds: string[] = []
): Promise<CreateApiKeyResult> {
  try {
    const authResult = await requireAuth();
    if ('error' in authResult) return authResult;

    if (!label || typeof label !== 'string' || !label.trim()) {
      return { error: 'Label is required', status: 400 };
    }

    let groupsToUse = groupIds;
    if (groupsToUse.length === 0) {
      const { groupId } = await findOrEnsureUserWithActiveGroup(
        authResult.user.email,
        authResult.user.name || null
      );
      groupsToUse = [groupId];
    } else {
      const dbUser = await prisma.user.findUnique({
        where: { email: authResult.user.email },
        include: {
          groupMemberships: {
            where: { status: 'active', groupId: { in: groupsToUse } },
            include: { group: true },
          },
        },
      });

      if (!dbUser) return { error: 'User not found', status: 404 };

      const userGroupIds = dbUser.groupMemberships.map((m) => m.groupId);
      const invalidGroups = groupsToUse.filter((id) => !userGroupIds.includes(id));

      if (invalidGroups.length > 0) {
        return {
          error: `You do not have access to the following groups: ${invalidGroups.join(', ')}`,
          status: 403,
        };
      }
    }

    const labelToUse = label.trim();
    const createdKeys: Array<{ apiKey: string; id: string; label: string; groupId: string }> = [];
    let lastError: string | undefined;

    for (const groupId of groupsToUse) {
      const result = await executeApiCall<PostApiInternalApiKeys201>((config) =>
        postApiInternalApiKeys(
          {
            groupId,
            label: groupsToUse.length > 1
              ? `${labelToUse} (${groupsToUse.indexOf(groupId) + 1})`
              : labelToUse,
          },
          config
        )
      );

      if (!result.success) {
        lastError = result.error.error;
        console.error('Backend API error for group', groupId, ':', result.error);
        continue;
      }

      const apiKeyData = result.data;
      const keyLabel =
        groupsToUse.length > 1
          ? `${labelToUse} (${groupsToUse.indexOf(groupId) + 1})`
          : labelToUse;

      createdKeys.push({
        apiKey: apiKeyData.apiKey,
        id: '', // API doesn't return id in create response
        label: keyLabel,
        groupId,
      });
    }

    if (createdKeys.length === 0) {
      return { error: lastError || 'Failed to create API keys for any group', status: 500 };
    }

    return {
      apiKey: createdKeys[0].apiKey,
      id: createdKeys[0].id,
      label: createdKeys[0].label,
      created: createdKeys.length,
    };
  } catch (error) {
    console.error('Error creating API key:', error);
    return { error: 'Internal server error', status: 500 };
  }
}
