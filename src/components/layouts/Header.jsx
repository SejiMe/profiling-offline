import React from 'react';
import Nav from '@/components/Nav';
import { NAV_TYPES } from '@/constants/getTypes';

export default function Header() {
  return (
    <header className='bg-green-500'>
      <Nav type={NAV_TYPES.PUBLIC} />
    </header>
  );
}
