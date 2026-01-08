'use server';

import { getCurrentUserFullDetails } from '@DonaldNgai/next-utils/auth/users';
import { getAuthenticatedAccessToken } from '@DonaldNgai/next-utils/auth';
import { auth0 } from '@/lib/auth/auth0';
import type { AxiosError, AxiosRequestConfig } from 'axios';

/**
 * Standard API error response
 */
export type ApiError = {
  error: string;
  status: number;
};

/**
 * Helper to get authenticated request config
 * Returns null if user is not authenticated
 */
async function getAuthConfig(): Promise<AxiosRequestConfig | ApiError> {
  const user = await getCurrentUserFullDetails(auth0);
  if (!user?.email) {
    return { error: 'Unauthorized', status: 401 };
  }

  const tokenResult = await getAuthenticatedAccessToken(auth0);
  if (!tokenResult.isValid || !tokenResult.token) {
    return { error: 'Failed to get access token', status: 401 };
  }

  return {
    headers: {
      Authorization: `Bearer ${tokenResult.token.token}`,
    },
  };
}

/**
 * API call result - either success with data or error
 */
export type ApiResult<T> = 
  | { success: true; data: T }
  | { success: false; error: ApiError };

/**
 * Execute an API call with authentication
 * Handles errors and returns standardized responses
 */
export async function executeApiCall<T>(
  apiCall: (config?: AxiosRequestConfig) => Promise<{ data: T }>,
  options?: {
    requireAuth?: boolean;
    customConfig?: AxiosRequestConfig;
  }
): Promise<ApiResult<T>> {
  try {
    let config: AxiosRequestConfig | undefined;

    if (options?.requireAuth !== false) {
      const authConfig = await getAuthConfig();
      if ('error' in authConfig) {
        return { success: false, error: authConfig };
      }
      config = { ...authConfig, ...options?.customConfig };
    } else {
      config = options?.customConfig;
    }

    const response = await apiCall(config);
    return { success: true, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorData = axiosError.response?.data as { error?: string } | undefined;
    return {
      success: false,
      error: {
        error: errorData?.error || 'API request failed',
        status: axiosError.response?.status || 500,
      },
    };
  }
}

/**
 * Check if current user is authenticated
 */
export async function requireAuth(): Promise<{ user: { email: string; name?: string | null } } | ApiError> {
  const user = await getCurrentUserFullDetails(auth0);
  if (!user?.email) {
    return { error: 'Unauthorized', status: 401 };
  }
  return { user: { email: user.email, name: user.name } };
}
