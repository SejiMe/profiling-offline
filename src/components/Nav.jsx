import { NAV_TYPES } from '@/constants/getTypes';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import React, { useState } from 'react';
import IconUser from '@/components/svg/icons8-user-secured/icons8-user-secured-48.svg';
import { Link as ScrollLink } from 'react-scroll';
import Button from './Button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import GoogleSVG from '@/components/svg/icons8-google.svg';
import CaramutanLogo from '~/images/caramutan-logo.png';
import Container from './layouts/Container';
import { auth } from '@/config/firebaseConfig';
import Modal from '@/components/Modal/Modal';
import { useMedia } from 'react-use';
import Blob from '@/components/svg/blob.svg';
import SecureDraw from '@/components/svg/undraw_secure_login_pdn4.svg';
import { useRouter } from 'next/router';
import SVGPeople from '@/components/svg/icons8-people/icons8-people.svg';
import SVGHome from '@/components/svg/icons8-home-page/icons8-home-page.svg';
import SVGDocument from '@/components/svg/icons8-submit-document/icons8-submit-document.svg';
import SVGProfile from '@/components/svg/icons8-profile/icons8-profile.svg';

// ----- Links for Navigation ----

const publicLinks = [
  { href: '/services', label: 'Online Services' },
  { href: '/contact', label: 'Contact Us' },
];
const adminLinks = [
  //TODO Links
  { href: '/admin', label: 'Home' },
  { href: '/admin/residents', label: 'Residents' },
  { href: '/admin/requests', label: 'Requests' },
  { href: '/admin/charter', label: 'Charter' },
];

const provider = new GoogleAuthProvider();
export default function Nav(props) {
  const [showLogin, setShowLogin] = useState(false);
  const navStyle = `bg-green-500 ${
    props.type === NAV_TYPES.PUBLIC ? 'h-40 w-full' : 'h-full'
  }`;

  const { user, logout } = useAuth();
  const [isDrop, setIsDrop] = useState(false);
  const handleDropdown = () => {
    setIsDrop((prev) => !prev);
  };

  const router = useRouter();
  // console.log(router);
  // -----------------------
  // for signin popups
  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  //showLogin is a boolean variable
  /* A ternary operator that sets the body overflow to hidden when the login modal is open and sets it
  to auto when the login modal is closed. */
  if (typeof window !== 'undefined') {
    showLogin
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }
  return (
    <nav className={navStyle}>
      {props.type === NAV_TYPES.PUBLIC ? (
        // PUBLIC LINKS OUTSIDE ADMIN PAGE
        <ul className='w-full h-full flex items-center justify-between p-3 space-x-4'>
          <div></div>
          <div className='flex flex-row space-x-3 gap-2 text-white'>
            <ScrollLink activeClass='active' to='home' spy={true}>
              Home
            </ScrollLink>
            <ScrollLink
              activeClass='active'
              to='services'
              smooth={true}
              duration={700}
              spy={true}
            >
              Online Services
            </ScrollLink>
            <ScrollLink
              activeClass='active'
              to='contact'
              smooth={true}
              duration={600}
              spy={true}
            >
              Contact Us
            </ScrollLink>
            <ScrollLink activeClass='active' to='about' spy={true}>
              About
            </ScrollLink>
          </div>
          {user?.uid === 'HLMj2JbZR1RdzkAiZEya0eAl0AD2' ? (
            <div id='dropdown' className='group'>
              <button
                className='peer cursor-pointer mr-5'
                onClick={handleDropdown}
              >
                <IconUser className='text-6xl text-white' />
              </button>
              <div
                className={`${
                  isDrop ? 'block absolute' : 'hidden'
                } z-10 flex flex-col gap-2 text-center bg-slate-200 float-right rounded right-10`}
              >
                <Link href='/admin'>
                  <a className='hover:bg-green-50 w-full h-full py-2 px-6 rounded'>
                    Admin
                  </a>
                </Link>
                <button
                  onClick={logout}
                  className='px-6 py-2 hover:bg-green-50 w-full h-full rounded'
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Button
                className='border rounded px-4 bg-transparent flex text-white text-center hover:text-white'
                onClick={handleShowLogin}
              >
                <IconUser className='text-white mr-1 mt-1' /> Login
              </Button>

              <Modal show={showLogin} onClose={handleCloseLogin}>
                <Login setShowLogin={setShowLogin} />
              </Modal>
            </>
          )}
        </ul>
      ) : (
        //THIS IS ADMIN LINKS
        <ul className='flex flex-col h-full'>
          <li className='w-full px-4 py-2 mb-3 border-b-2 border-green-800 shadow-lg '>
            <Link
              href='/'
              onClick={() => {
                router.push('/');
              }}
            >
              <Image
                className='hover:cursor-pointer'
                src={CaramutanLogo}
                width=''
              />
            </Link>
          </li>
          <ul className='flex flex-col justify-between space-y-4 '>
            {adminLinks.map(({ href, label }) => (
              <li
                key={`${href} ${label}`}
                className={` ${
                  router.pathname === href
                    ? 'border-l-8 border-green-800 bg-green-200 text-black group'
                    : null
                } h-10 py-2 pl-2 hover:bg-green-300 group`}
              >
                <Link href={href} className=''>
                  <a
                    className={` ${
                      router.pathname === href
                        ? 'text-black hover:text-white'
                        : 'text-white fill-white  hover:text-black hover:fill-black'
                    } flex  justify-start items-center h-full align-middle`}
                  >
                    {href === '/admin' ? <SVGHome className='mr-2' /> : null}
                    {href === '/admin/residents' ? (
                      <SVGProfile className='mr-2' />
                    ) : null}
                    {href === '/admin/requests' ? (
                      <SVGDocument className='mr-2' />
                    ) : null}
                    {href === '/admin/charter' ? (
                      <SVGPeople className='mr-2' />
                    ) : null}
                    {label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </ul>
      )}
    </nav>
  );
}

function Login({ setShowLogin }) {
  // ----- Media Tracker State ------
  const isSmall = useMedia('(max-width: 480px)');
  console.log('isSmall: ' + isSmall);

  /**
   * When the user clicks the login button, the user will be redirected to the Google login page, and
   * then redirected back to the app.
   */
  const handleLogin = async () => {
    await signInWithPopup(auth, provider);
    setShowLogin(false);
  };
  return (
    <Container className='md:flex flex-row flex-grow-1 px-0 py-0 w-full overflow-auto'>
      {!isSmall ? (
        <div className='bg-blue-600 w-[50%] p-0 rounded-l-xl overflow-auto'>
          <Blob className='p-0 w-96 h-96 z-0 absolute top-1/3 left-1/3' />
          <SecureDraw className='w-52 h-52 absolute sm:left-1/4 lg:left-1/3 top-1/3 z-10' />
        </div>
      ) : null}
      <div className='bg-green-500 p-10 overflow-auto h-[80%] md:w-[50%] md:h-full rounded-xl sm:rounded-none md:rounded-r-xl flex flex-col sm:p-2 text-center'>
        <div className='border-b-2 mt-10 w-full'>
          <h1 className='text-white mb-2'>Admin Login</h1>
        </div>
        <br />
        <div className='mt-10 flex flex-col gap-10 justify-between'>
          <div className='flex justify-center align-middle'>
            <Image src={CaramutanLogo} width={128} height={128} />
          </div>
          <div className='flex justify-center'>
            <button
              type='button'
              onClick={handleLogin}
              className='bg-white text-lg font-bold  p-2 rounded-lg flex justify-center align-middle content-center'
            >
              <GoogleSVG className='w-10 h-8' />
              <span className=''>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
