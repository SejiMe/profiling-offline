import React from 'react';
import Nav from '@/components/Nav';
import { NAV_TYPES as types } from '@/constants/getTypes';

export default function Footer() {
  return (
    <footer className='container'>
      <Nav type={types.PUBLIC}/>
    </footer>
  );
}
