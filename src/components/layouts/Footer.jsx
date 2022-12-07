import React from 'react';
import Nav from '@/components/Nav';
import TarlacLogo from '~/images/tarlac-logo.png';
import { NAV_TYPES as types } from '@/constants/getTypes';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='container bg-green-400'>
      <Image src={TarlacLogo} width={50} height={50} />
    </footer>
  );
}
