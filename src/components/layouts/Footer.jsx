import React from 'react';
import Nav from '@/components/Nav';
import TestLogo from '~/images/testimg.png';

import { NAV_TYPES as types } from '@/constants/getTypes';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className=' bg-green-500 h-full w-full px-4 py-6 flex flex-col gap-2 justify-center align-middle items-center'>
      <div className='flex gap-4'>
        <Image src={TestLogo} width={70} height={70} />
        <Image src={TestLogo} width={70} height={70} />
        <Image src={TestLogo} width={70} height={70} />
      </div>
      <div>Ⓒ BARANGAY 2022</div>
    </footer>
  );
}
