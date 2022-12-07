import { NAV_TYPES } from '@/constants/getTypes';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import React from 'react';
import Nav from '../Nav';

function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className='flex flex-col justify-between gap-1 bg-green-500 h-screen'>
      <Nav type={NAV_TYPES.ADMIN} />
      {/**Temporary button for logging out*/}
    </div>
  );
}

export default Sidebar;
