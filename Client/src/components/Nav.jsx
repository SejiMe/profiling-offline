import { NAV_TYPES } from '@/constants/getTypes';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import React, { useState } from 'react';
import IconUser from '@/components/svg/icons8-user-secured/icons8-user-secured-48.svg';
import { Link as ScrollLink } from 'react-scroll';
const publicLinks = [
  { href: '/services', label: 'Online Services' },
  { href: '/contact', label: 'Contact Us' },
];
const adminLinks = [
  //TODO Links
  { href: '/admin/', label: 'Home' },
  { href: '/admin/residents', label: 'Resident Information' },
  { href: '/admin/charter', label: 'Documents and Requests' },
  { href: '/admin/charter', label: 'Charter' },
  { href: '/admin/requests', label: 'Requests' },
  { href: '/admin/templates', label: 'Audit Log' },
];

export default function Nav(props) {
  const navStyle = `bg-green-800 ${
    props.type === NAV_TYPES.PUBLIC ? 'h-40 w-full' : 'h-full'
  }`;

  const { user, logout } = useAuth();

  const [isDrop, setIsDrop] = useState(true);
  const handleDropdown = () => {
    setIsDrop((prev) => !prev);
  };
  return (
    <nav className={navStyle}>
      {props.type === NAV_TYPES.PUBLIC ? (
        // PUBLIC LINKS OUTSIDE ADMIN PAGE

        <ul className='w-full h-full flex items-center justify-between p-3 space-x-4'>
          <div></div>
          <div className='flex flex-row space-x-3 gap-2'>
            <ScrollLink activeClass='active' to='home' spy={true}>
              Home
            </ScrollLink>
            <ScrollLink activeClass='active' to='services' spy={true}>
              Online Services
            </ScrollLink>
            <ScrollLink activeClass='active' to='contact' spy={true}>
              Contact Us
            </ScrollLink>
            <ScrollLink activeClass='active' to='about' spy={true}>
              About
            </ScrollLink>
          </div>
          {user ? (
            <div id='dropdown' className='group'>
              <button
                className='peer cursor-pointer mr-5'
                onClick={handleDropdown}
              >
                <IconUser className='text-6xl text-white' />
              </button>
              <div className={(isDrop ? 'hidden' : 'block') + ' flex flex-col'}>
                <Link href='/admin'>
                  <a>Admin</a>
                </Link>
                <button onClick={logout}>Logout</button>
              </div>
            </div>
          ) : (
            <li>
              <Link href='/login'>
                <a>Login</a>
              </Link>
            </li>
          )}
        </ul>
      ) : (
        //THIS IS ADMIN LINKS
        <ul className='flex flex-col h-full '>
          <li>
            <Link href='/'>
              <img
                src='/images/Logo Caramutan.png'
                className='w-[80%] hover:cursor-pointer'
                alt=''
              />
            </Link>
          </li>
          <ul className='flex flex-col justify-between space-y-4'>
            {adminLinks.map(({ href, label }) => (
              <li key={`${href} ${label}`} className='hover:bg-green-300'>
                <Link href={href}>
                  <a className='text-white hover:text-black'>{label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </ul>
      )}
    </nav>
  );
}
