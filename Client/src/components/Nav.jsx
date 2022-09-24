import {NAV_TYPES} from '@/constants/getTypes';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const publicLinks = [
  { href: '/services', label: 'Online Services' },
  { href: '/contact', label: 'Contact Us' },
];

const adminLinks = [
  { href: '/admin/residents', label: 'Residents' },
  { href: '/admin/requests', label: 'Requests' },
  { href: '/admin/charter', label: 'Charter' },
  { href: '/admin/templates', label: 'templates' },
];

export default function Nav(props) {
  const navStyle = `bg-green-800 ${
    props.type === NAV_TYPES.PUBLIC ? 'h-40' : 'h-full'
  }`;

  const { user, logout } = useAuth();

  return (
    <nav className={navStyle}>
      {props.type === NAV_TYPES.PUBLIC ? (
        // PUBLIC LINKS OUTSIDE ADMIN PAGE
        <ul className='flex flex-row items-center justify-between px-8 py-4'>
          <li>
            <Link href='/'>
              <a className='font-bold text-green-400'>
                <img src='/images/Logo Caramutan.png' className='w-2' alt='' />
              </a>
            </Link>
          </li>
          <ul className='flex items-center justify-between space-x-4'>
            {publicLinks.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <Link href={href}>
                  <a className='text-white hover:text-green-400'>{label}</a>
                </Link>
              </li>
            ))}
            {user ? (
              <li
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </li>
            ) : (
              <li>
                <Link href='/login'>
                  <a>Login</a>
                </Link>
              </li>
            )}
          </ul>
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
