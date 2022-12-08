import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from '../Button';
import User from '@/components/svg/icons8-user/icons8-user.svg';
import SVGLogout from '@/components/svg/icons8-sign-out/icons8-sign-out.svg';
import { useAuth } from '@/contexts/AuthContext';

const SplitPane = (props) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  let sectionHeader = '';
  let headerTitle = '';
  const [isDrop, setIsDrop] = useState(false);
  const sec = router.pathname;
  if (router.pathname.length > 6) {
    sectionHeader = router.pathname.slice(7);
  } else {
    sectionHeader = router.pathname.slice(1);
  }
  switch (sectionHeader) {
    case 'residents':
      headerTitle = 'Caramutan Residents';
      break;
    case 'charter':
      headerTitle = 'Barangay Officials';
      break;
    case 'requests':
      headerTitle = 'Document Requested';
      break;

    default:
      headerTitle = 'Barangay Caramutan';
      break;
  }
  const handleDropdown = () => {
    console.log(isDrop);
    setIsDrop((prev) => !prev);
  };
  return (
    //TODO UI
    <div className='flex flex-row h-screen w-screen'>
      <div className='lg:w-[20%] md:w-[15%] sm:w-[20%] h-screen'>
        {props.left}
      </div>
      <div className='w-screen h-screen bg-slate-200 overflow-auto'>
        <header className='w-full h-20 bg-white flex text-center align-middle items-center justify-between'>
          <div className='flex justify-between w-full align-middle items-center'>
            {/* Title of page */}
            <h3 className='ml-4'>{headerTitle}</h3>
            <div>
              <Button
                type='button'
                onClick={handleDropdown}
                className={'bg-transparent mr-4'}
              >
                <User className='w-8 h-8' />
              </Button>
              <div>
                <div
                  className={`${
                    isDrop ? 'block absolute' : 'hidden'
                  } right-10  p-2 text-center float-right rounded border bg-slate-300 `}
                >
                  <Button
                    className='group flex justify-center items-center align-middle w-full text-center bg-transparent hover:bg-green-500 hover:text-white font-normal'
                    onClick={() => {
                      logout();
                      router.push('/');
                    }}
                  >
                    <SVGLogout className='group-hover:fill-white w-4 h-4 mr-2' />{' '}
                    Sign out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>
        {props.right}
      </div>
    </div>
  );
};

export default SplitPane;
