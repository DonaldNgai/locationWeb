'use server';

import { getCurrentUserFullDetails } from '@DonaldNgai/next-utils/auth/users';
import { getUserByEmail } from '@DonaldNgai/next-utils/auth/users';
import { getAuthenticatedAccessToken } from '@DonaldNgai/next-utils/auth';
import { auth0 } from '@/lib/auth/auth0';
import { prisma } from '@/lib/db/prisma';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

type InviteUserToGroupResult = {
  success?: boolean;
  error?: string;
  status?: number;
};

type BatchInviteResult = {
  success?: boolean;
  invited?: number; // Number of successful invitations
  failed?: number; // Number of failed invitations
  errors?: Array<{ email: string; error: string }>;
  error?: string;
  status?: number;
};

type BatchInviteResult = {
  success?: boolean;
  invited?: number; // Number of successful invitations
  failed?: number; // Number of failed invitations
  errors?: Array<{ email: string; error: string }>;
  error?: string;
  status?: number;
};

type PendingRequest = {
  id: string;
  userEmail: string;
  userName: string | null;
  createdAt: Date;
};

type GetPendingRequestsResult = {
  requests?: PendingRequest[];
  error?: string;
  status?: number;
};

type ApiKey = {
  id: string;
  label: string;
  createdAt: string;
  lastUsedAt: string | null;
  groupId?: string;
};

type GetGroupApiKeysResult = {
  apiKeys?: ApiKey[];
  error?: string;
  status?: number;
};

type VerifyUserResult = {
  exists?: boolean;
  user?: {
    id: string;
    email: string;
    name: string | null;
  };
  error?: string;
  status?: number;
};

/**
 * Server action to verify if a user exists by email
 */
export async function verifyUserExists(email: string): Promise<VerifyUserResult> {
  try {
    const user = await getCurrentUserFullDetails(auth0);
    if (!user?.email) {
      return {
        error: 'Unauthorized',
        status: 401,
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return {
        error: 'Invalid email format',
        status: 400,
      };
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Check Auth0 for user
    const auth0User = await getUserByEmail(trimmedEmail);
    
    if (!auth0User) {
      return {
        exists: false,
      };
    }

    // Check if user exists in database, create if not
    let dbUser = await prisma.user.findUnique({
      where: { email: trimmedEmail },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          email: trimmedEmail,
          name: auth0User.name || null,
        },
      });
    }

    return {
      exists: true,
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
      },
    };
  } catch (error) {
    console.error('Error verifying user:', error);
    return {
      error: 'Internal server error',
      status: 500,
    };
  }
}

/**
 * Server action to invite a user to a specific group
 */
export async function inviteUserToGroup(
  groupId: string,
  userEmail: string
): Promise<InviteUserToGroupResult> {
  try {
    const currentUser = await getCurrentUserFullDetails(auth0);
    if (!currentUser?.email) {
      return {
        error: 'Unauthorized',
        status: 401,
      };
    }

    if (!groupId || typeof groupId !== 'string') {
      return {
        error: 'Group ID is required',
        status: 400,
      };
    }

    if (!userEmail || typeof userEmail !== 'string') {
      return {
        error: 'User email is required',
        status: 400,
      };
    }

    const trimmedEmail = userEmail.trim().toLowerCase();

    // Verify user exists
    const verifyResult = await verifyUserExists(trimmedEmail);
    if (!verifyResult.exists || !verifyResult.user) {
      return {
        error: 'User does not exist',
        status: 404,
      };
    }

    const userId = verifyResult.user.id;

    // Verify current user has access to this group
    const currentDbUser = await prisma.user.findUnique({
      where: { email: currentUser.email },
      include: {
        groupMemberships: {
          where: {
            status: 'active',
            groupId,
          },
        },
      },
    });

    if (!currentDbUser || currentDbUser.groupMemberships.length === 0) {
      return {
        error: 'You do not have access to this group',
        status: 403,
      };
    }

    // Verify group exists
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      return {
        error: 'Group not found',
        status: 404,
      };
    }

    // Check if membership already exists
    const existingMembership = await prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
    });

    if (existingMembership) {
      if (existingMembership.status === 'active') {
        return {
          error: 'User is already a member of this group',
          status: 400,
        };
      }
      // Update status to pending if it was inactive
      await prisma.groupMember.update({
        where: {
          id: existingMembership.id,
        },
        data: {
          status: 'pending',
        },
      });
    } else {
      // Create new pending membership
      await prisma.groupMember.create({
        data: {
          groupId,
          userId,
          status: 'pending',
        },
      });
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error inviting user to group:', error);
    return {
      error: 'Internal server error',
      status: 500,
    };
  }
}

/**
 * Server action to get pending membership requests for a specific group
 */
export async function getPendingRequestsForGroup(
  groupId: string
): Promise<GetPendingRequestsResult> {
  try {
    const currentUser = await getCurrentUserFullDetails(auth0);
    if (!currentUser?.email) {
      return {
        error: 'Unauthorized',
        status: 401,
      };
    }

    if (!groupId || typeof groupId !== 'string') {
      return {
        error: 'Group ID is required',
        status: 400,
      };
    }

    // Verify current user has access to this group
    const currentDbUser = await prisma.user.findUnique({
      where: { email: currentUser.email },
      include: {
        groupMemberships: {
          where: {
            status: 'active',
            groupId,
          },
        },
      },
    });

    if (!currentDbUser || currentDbUser.groupMemberships.length === 0) {
      return {
        error: 'You do not have access to this group',
        status: 403,
      };
    }

    // Get pending requests for this group
    const pendingMemberships = await prisma.groupMember.findMany({
      where: {
        groupId,
        status: 'pending',
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const requests: PendingRequest[] = pendingMemberships.map((membership) => ({
      id: membership.id,
      userEmail: membership.user.email,
      userName: membership.user.name,
      createdAt: membership.createdAt,
    }));

    return {
      requests,
    };
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    return {
      error: 'Internal server error',
      status: 500,
    };
  }
}

/**
 * Server action to get API keys for a specific group
 */
export async function getApiKeysForGroup(groupId: string): Promise<GetGroupApiKeysResult> {
  try {
    const currentUser = await getCurrentUserFullDetails(auth0);
    if (!currentUser?.email) {
      return {
        error: 'Unauthorized',
        status: 401,
      };
    }

    if (!groupId || typeof groupId !== 'string') {
      return {
        error: 'Group ID is required',
        status: 400,
      };
    }

    // Verify current user has access to this group
    const currentDbUser = await prisma.user.findUnique({
      where: { email: currentUser.email },
      include: {
        groupMemberships: {
          where: {
            status: 'active',
            groupId,
          },
        },
      },
    });

    if (!currentDbUser || currentDbUser.groupMemberships.length === 0) {
      return {
        error: 'You do not have access to this group',
        status: 403,
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

    // Call backend API to get all API keys
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
    const allApiKeys = data.items || data || [];

    // Filter API keys for this specific group
    // The backend API should return groupId in the response, but if not, we'll need to check the database
    const groupApiKeys = allApiKeys.filter((key: any) => key.groupId === groupId);

    // If the backend doesn't return groupId, fall back to database query
    if (groupApiKeys.length === 0 && allApiKeys.length > 0) {
      // Get API keys from database for this group
      const dbApiKeys = await prisma.apiKey.findMany({
        where: {
          groupId,
          revokedAt: null, // Only get non-revoked keys
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Match database keys with backend keys by label or other identifier
      const matchedKeys = allApiKeys.filter((backendKey: any) => {
        return dbApiKeys.some((dbKey) => {
          // Try to match by label or ID
          return backendKey.label === dbKey.label || backendKey.id === dbKey.id;
        });
      });

      return {
        apiKeys: matchedKeys.map((key: any) => ({
          id: key.id,
          label: key.label,
          createdAt: key.createdAt,
          lastUsedAt: key.lastUsedAt || null,
          groupId,
        })),
      };
    }

    return {
      apiKeys: groupApiKeys.map((key: any) => ({
        id: key.id,
        label: key.label,
        createdAt: key.createdAt,
        lastUsedAt: key.lastUsedAt || null,
        groupId,
      })),
    };
  } catch (error) {
    console.error('Error fetching API keys for group:', error);
    return {
      error: 'Internal server error',
      status: 500,
    };
  }
}

/**
 * Server action to invite multiple users to multiple groups
 */
export async function batchInviteUsersToGroups(
  userEmails: string[],
  groupIds: string[]
): Promise<BatchInviteResult> {
  try {
    const currentUser = await getCurrentUserFullDetails(auth0);
    if (!currentUser?.email) {
      return {
        error: 'Unauthorized',
        status: 401,
      };
    }

    if (!userEmails || !Array.isArray(userEmails) || userEmails.length === 0) {
      return {
        error: 'At least one user email is required',
        status: 400,
      };
    }

    if (!groupIds || !Array.isArray(groupIds) || groupIds.length === 0) {
      return {
        error: 'At least one group must be selected',
        status: 400,
      };
    }

    // Verify current user has access to all groups
    const currentDbUser = await prisma.user.findUnique({
      where: { email: currentUser.email },
      include: {
        groupMemberships: {
          where: {
            status: 'active',
            groupId: { in: groupIds },
          },
        },
      },
    });

    if (!currentDbUser) {
      return {
        error: 'User not found',
        status: 404,
      };
    }

    const adminGroupIds = currentDbUser.groupMemberships.map((m) => m.groupId);
    const invalidGroups = groupIds.filter((id) => !adminGroupIds.includes(id));

    if (invalidGroups.length > 0) {
      return {
        error: `You do not have access to the following groups: ${invalidGroups.join(', ')}`,
        status: 403,
      };
    }

    // Verify all groups exist
    const groups = await prisma.group.findMany({
      where: {
        id: { in: groupIds },
      },
    });

    if (groups.length !== groupIds.length) {
      const foundGroupIds = groups.map((g) => g.id);
      const missingGroups = groupIds.filter((id) => !foundGroupIds.includes(id));
      return {
        error: `The following groups do not exist: ${missingGroups.join(', ')}`,
        status: 404,
      };
    }

    // Process each user email
    let invitedCount = 0;
    const errors: Array<{ email: string; error: string }> = [];

    for (const email of userEmails) {
      const trimmedEmail = email.trim().toLowerCase();
      
      if (!trimmedEmail) {
        continue;
      }

      // Verify user exists
      const verifyResult = await verifyUserExists(trimmedEmail);
      if (!verifyResult.exists || !verifyResult.user) {
        errors.push({
          email: trimmedEmail,
          error: 'User not found',
        });
        continue;
      }

      const userId = verifyResult.user.id;
      let userInvited = false;

      // Invite user to each group
      for (const groupId of groupIds) {
        try {
          // Check if membership already exists
          const existingMembership = await prisma.groupMember.findUnique({
            where: {
              groupId_userId: {
                groupId,
                userId,
              },
            },
          });

          if (existingMembership) {
            if (existingMembership.status === 'active') {
              // Already a member, skip silently
              continue;
            }
            // Update status to pending if it was inactive
            await prisma.groupMember.update({
              where: {
                id: existingMembership.id,
              },
              data: {
                status: 'pending',
              },
            });
            userInvited = true;
          } else {
            // Create new pending membership
            await prisma.groupMember.create({
              data: {
                groupId,
                userId,
                status: 'pending',
              },
            });
            userInvited = true;
          }
        } catch (error) {
          console.error(`Error inviting user ${trimmedEmail} to group ${groupId}:`, error);
          errors.push({
            email: trimmedEmail,
            error: `Failed to invite to group ${groupId}`,
          });
        }
      }

      if (userInvited) {
        invitedCount++;
      }
    }

    return {
      success: invitedCount > 0,
      invited: invitedCount,
      failed: errors.length,
      errors: errors.length > 0 ? errors : undefined,
    };
  } catch (error) {
    console.error('Error in batch invite:', error);
    return {
      error: 'Internal server error',
      status: 500,
    };
  }
}
