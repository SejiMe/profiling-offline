import { NAV_TYPES } from '@/constants/getTypes';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import React from 'react';
import Nav from '../Nav';

function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className='flex flex-col justify-between gap-1 w-full h-screen'>
      <Nav type={NAV_TYPES.ADMIN} />
      {/**Temporary button for logging out*/}
      <button
        className='border'
        onClick={() => {
          logout();
          router.push('/');
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default Sidebar;
