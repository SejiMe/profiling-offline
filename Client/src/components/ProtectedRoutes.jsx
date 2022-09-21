import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

/**
 * If the user is not logged in, redirect to the login page.
 * @returns The children of the component.
 */
export const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && sessionStorage.getItem('Token') == null) {
      router.push('/login');
    }
  }, [router, user]);
  return <>{user ? children : null}</>;
};
