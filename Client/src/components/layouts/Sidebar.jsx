import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import React from 'react';

function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className='w-20 h-full'>
      <h1>Sidebar</h1>
      {/**Temporary button for loggin out*/}
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
