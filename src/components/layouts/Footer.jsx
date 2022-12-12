import React from 'react';
import Nav from '@/components/Nav';
import TarlacLogo from '~/images/tarlac-logo.png';
import LapazLogo from '~/images/lapaz-logo.png';
import BrandWhite from '~/images/BrandWhite.svg';
import { NAV_TYPES as types } from '@/constants/getTypes';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className=' bg-green-500 h-full w-full px-4 py-6 flex flex-col gap-2 justify-center align-middle items-center'>
      <div className='flex gap-4'>
        <Image src={TarlacLogo} width={50} height={50} />
        <Image src={LapazLogo} width={50} height={50} />
        <BrandWhite className={'fill-white w-[50px] h-[50px]'} />
      </div>
      <div>Ⓒ CARAMUTAN 2022</div>
    </footer>
  );
}
