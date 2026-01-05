'use server';

import { getCurrentUserFullDetails } from '@DonaldNgai/next-utils/auth/users';
import { getAuthenticatedAccessToken } from '@DonaldNgai/next-utils/auth';
import { auth0 } from '@/lib/auth/auth0';
import { prisma } from '@/lib/db/prisma';
import type { Prisma } from '@prisma/client';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

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
 * Returns the user and their active group ID
 */
async function findOrEnsureUserWithActiveGroup(
  userEmail: string,
  userName: string | null
): Promise<{ dbUser: UserWithGroup; groupId: string }> {
  // Find or create user in Prisma database
  let dbUser: UserWithGroup | null = await prisma.user.findUnique({
    where: { email: userEmail },
    include: {
      groupMemberships: {
        where: {
          status: 'active',
        },
        include: {
          group: true,
        },
      },
    },
  });

  let groupId: string;

  if (!dbUser) {
    // Create user and group
    const newGroup = await prisma.group.create({
      data: {
        name: `${userName || userEmail}'s Group`,
        ownerId: '', // Will be set after user creation
      },
    });

    const newUser = await prisma.user.create({
      data: {
        email: userEmail,
        name: userName,
        groupMemberships: {
          create: {
            groupId: newGroup.id,
            status: 'active',
          },
        },
      },
      include: {
        groupMemberships: {
          where: {
            status: 'active',
          },
          include: {
            group: true,
          },
        },
      },
    });

    // Update group owner
    await prisma.group.update({
      where: { id: newGroup.id },
      data: { ownerId: newUser.id },
    });

    dbUser = newUser;

    groupId = newGroup.id;
  } else {
    // Find user's active group or create one
    const activeGroup = dbUser.groupMemberships.find(
      (m) => m.status === 'active'
    )?.group;

    if (activeGroup) {
      groupId = activeGroup.id;
    } else {
      // Create a new group for the user
      const newGroup = await prisma.group.create({
        data: {
          name: `${dbUser.name || dbUser.email}'s Group`,
          ownerId: dbUser.id,
        },
      });

      await prisma.groupMember.create({
        data: {
          groupId: newGroup.id,
          userId: dbUser.id,
          status: 'active',
        },
      });

      groupId = newGroup.id;

      // Refresh dbUser to include the new membership
      const refreshedUser = await prisma.user.findUnique({
        where: { email: userEmail },
        include: {
          groupMemberships: {
            where: {
              status: 'active',
            },
            include: {
              group: true,
            },
          },
        },
      });

      if (!refreshedUser) {
        throw new Error('Failed to refresh user after creating group membership');
      }

      dbUser = refreshedUser;
    }
  }

  if (!dbUser) {
    throw new Error('User not found after creation/update');
  }

  return { dbUser, groupId };
}

type Group = {
  id: string;
  name: string;
  description: string | null;
};

type GetUserGroupsResult = {
  groups?: Group[];
  error?: string;
  status?: number;
};

type CreateGroupResult = {
  group?: Group;
  error?: string;
  status?: number;
};

type GetApiKeysResult = {
  items?: Array<{
    id: string;
    label: string;
    createdAt: string;
    lastUsedAt: string | null;
  }>;
  error?: string;
  status?: number;
};

/**
 * Server action to create a new group for the user
 */
export async function createGroup(name: string, description?: string): Promise<CreateGroupResult> {
  try {
    // Get authenticated user
    const user = await getCurrentUserFullDetails(auth0);
    if (!user?.email) {
      return {
        error: 'Unauthorized',
        status: 401,
      };
    }

    // Validate name
    if (!name || typeof name !== 'string' || !name.trim()) {
      return {
        error: 'Group name is required',
        status: 400,
      };
    }

    // Find or create user
    let dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!dbUser) {
      // Create user first
      dbUser = await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
        },
      });
    }

    // Create group
    const newGroup = await prisma.group.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        ownerId: dbUser.id,
      },
    });

    // Add user as active member
    await prisma.groupMember.create({
      data: {
        groupId: newGroup.id,
        userId: dbUser.id,
        status: 'active',
      },
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
    return {
      error: 'Internal server error',
      status: 500,
    };
  }
}

/**
 * Server action to fetch user's active groups
 */
export async function getUserGroups(): Promise<GetUserGroupsResult> {
  try {
    // Get authenticated user
    const user = await getCurrentUserFullDetails(auth0);
    if (!user?.email) {
      return {
        error: 'Unauthorized',
        status: 401,
      };
    }

    // Find user in database with their groups
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: {
        groupMemberships: {
          where: {
            status: 'active',
          },
          include: {
            group: true,
          },
        },
      },
    });

    if (!dbUser) {
      return {
        groups: [],
      };
    }

    const groups = dbUser.groupMemberships.map((membership) => ({
      id: membership.group.id,
      name: membership.group.name,
      description: membership.group.description,
    }));

    return {
      groups,
    };
  } catch (error) {
    console.error('Error fetching user groups:', error);
    return {
      error: 'Internal server error',
      status: 500,
    };
  }
}

/**
 * Server action to fetch API keys for the authenticated user's groups
 * Calls the backend API with the user's access token
 */
export async function getApiKeys(): Promise<GetApiKeysResult> {
  try {
    // Get authenticated user
    const user = await getCurrentUserFullDetails(auth0);
    if (!user?.email) {
      return {
        error: 'Unauthorized',
        status: 401,
      };
    }

    // Get access token for backend API
    const tokenResult = await getAuthenticatedAccessToken(auth0);
    if (!tokenResult.isValid || !tokenResult.token) {
      return {
        error: 'Failed to get access token',
        status: 401,
      };
    }

    // Call backend API to get API keys
    const backendResponse = await fetch(`${BACKEND_API_URL}/api/internal/api-keys`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenResult.token.token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}));
      console.error('Backend API error:', errorData);
      return {
        error: errorData.error || 'Failed to fetch API keys',
        status: backendResponse.status,
      };
    }

    const data = await backendResponse.json();
    return {
      items: data.items || data || [],
    };
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return {
      error: 'Internal server error',
      status: 500,
    };
  }
}

type CreateApiKeyResult = {
  apiKey?: string;
  id?: string;
  label?: string;
  error?: string;
  status?: number;
  created?: number; // Number of API keys created
};

type DeleteApiKeyResult = {
  success?: boolean;
  error?: string;
  status?: number;
};

/**
 * Server action to delete an API key via the backend API
 */
export async function deleteApiKey(id: string): Promise<DeleteApiKeyResult> {
  try {
    // Get authenticated user
    const user = await getCurrentUserFullDetails(auth0);
    if (!user?.email) {
      return {
        error: 'Unauthorized',
        status: 401,
      };
    }

    // Validate id
    if (!id || typeof id !== 'string' || !id.trim()) {
      return {
        error: 'API key ID is required',
        status: 400,
      };
    }

    // Get access token for backend API
    const tokenResult = await getAuthenticatedAccessToken(auth0);
    if (!tokenResult.isValid || !tokenResult.token) {
      return {
        error: 'Failed to get access token',
        status: 401,
      };
    }

    // Call backend API to delete API key
    // The backend will verify that the user has permission to delete this key
    const backendResponse = await fetch(`${BACKEND_API_URL}/api/internal/api-keys/${id.trim()}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${tokenResult.token.token}`,
      },
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}));
      console.error('Backend API error:', errorData);
      return {
        error: errorData.error || 'Failed to delete API key',
        status: backendResponse.status,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting API key:', error);
    return {
      error: 'Internal server error',
      status: 500,
    };
  }
}

/**
 * Server action to create a new API key via the backend API
 * @param label - Label for the API key
 * @param groupIds - Array of group IDs to associate with the API key. If empty, will create/use default group.
 */
export async function createApiKey(
  label: string,
  groupIds: string[] = []
): Promise<CreateApiKeyResult> {
  try {
    // Get authenticated user
    const user = await getCurrentUserFullDetails(auth0);
    if (!user?.email) {
      return {
        error: 'Unauthorized',
        status: 401,
      };
    }

    // Validate label
    if (!label || typeof label !== 'string' || !label.trim()) {
      return {
        error: 'Label is required',
        status: 400,
      };
    }

    // Get access token for backend API
    const tokenResult = await getAuthenticatedAccessToken(auth0);
    if (!tokenResult.isValid || !tokenResult.token) {
      return {
        error: 'Failed to get access token',
        status: 401,
      };
    }

    // If no groups specified, ensure user has at least one group
    let groupsToUse = groupIds;
    if (groupsToUse.length === 0) {
      const { groupId } = await findOrEnsureUserWithActiveGroup(
        user.email,
        user.name
      );
      groupsToUse = [groupId];
    } else {
      // Validate that user has access to all specified groups
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: {
          groupMemberships: {
            where: {
              status: 'active',
              groupId: { in: groupsToUse },
            },
            include: {
              group: true,
            },
          },
        },
      });

      if (!dbUser) {
        return {
          error: 'User not found',
          status: 404,
        };
      }

      const userGroupIds = dbUser.groupMemberships.map((m) => m.groupId);
      const invalidGroups = groupsToUse.filter((id) => !userGroupIds.includes(id));

      if (invalidGroups.length > 0) {
        return {
          error: `You do not have access to the following groups: ${invalidGroups.join(', ')}`,
          status: 403,
        };
      }
    }

    // Create API key for each selected group
    // Since the backend API associates one key per group, we'll create one key per group
    const labelToUse = label.trim();
    const createdKeys: Array<{ apiKey: string; id: string; label: string; groupId: string }> = [];
    let lastError: string | undefined;

    for (const groupId of groupsToUse) {
      try {
        const backendResponse = await fetch(`${BACKEND_API_URL}/api/internal/api-keys`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenResult.token.token}`,
          },
          body: JSON.stringify({
            groupId,
            label: groupsToUse.length > 1 ? `${labelToUse} (${groupsToUse.indexOf(groupId) + 1})` : labelToUse,
          }),
        });

        if (!backendResponse.ok) {
          const errorData = await backendResponse.json().catch(() => ({}));
          lastError = errorData.error || 'Failed to create API key';
          console.error('Backend API error for group', groupId, ':', errorData);
          continue; // Try next group
        }

        const apiKeyData = await backendResponse.json();
        createdKeys.push({
          apiKey: apiKeyData.apiKey || apiKeyData.secret || apiKeyData.key,
          id: apiKeyData.id,
          label: apiKeyData.label,
          groupId,
        });
      } catch (error) {
        console.error('Error creating API key for group', groupId, ':', error);
        lastError = 'Error creating API key';
      }
    }

    if (createdKeys.length === 0) {
      return {
        error: lastError || 'Failed to create API keys for any group',
        status: 500,
      };
    }

    // Return the first created key (for display purposes)
    // In the UI, we can show a message about how many keys were created
    return {
      apiKey: createdKeys[0].apiKey,
      id: createdKeys[0].id,
      label: createdKeys[0].label,
      created: createdKeys.length,
    };
  } catch (error) {
    console.error('Error creating API key:', error);
    return {
      error: 'Internal server error',
      status: 500,
    };
  }
}