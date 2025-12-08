'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

export function RoleCheck() {
  const router = useRouter();
  const { data: user } = useSWR('/api/user', (url) => fetch(url).then(res => res.json()));

  useEffect(() => {
    if (user && !user.userType) {
      router.push('/dashboard/select-role');
    }
  }, [user, router]);

  return null;
}

