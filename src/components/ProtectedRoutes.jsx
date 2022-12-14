import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

/**
 * If the user is not logged in, redirect to the login page.
 * @returns The children of the component.
 */
export const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem('token') === null) {
      router.push('/');
    }
  }, [router, user]);

  return (
    <>
      {user?.token && sessionStorage.getItem('token') !== null
        ? children
        : null}
    </>
  );
};
