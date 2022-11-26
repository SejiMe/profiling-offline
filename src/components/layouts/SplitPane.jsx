import { useRouter } from 'next/router';
import React from 'react';

const SplitPane = (props) => {
  const router = useRouter();
  let sectionHeader = '';
  let headerTitle = '';
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
  console.log(sec);
  return (
    //TODO UI
    <div className='flex flex-row h-screen w-screen'>
      <div className='w-40 h-screen'>{props.left}</div>
      <div className='w-screen h-screen bg-slate-200 overflow-auto'>
        <header className='w-full h-20 bg-blue-300'>
          <div>
            {/* Title of page */}
            <h3>{headerTitle}</h3>
          </div>
        </header>
        {props.right}
      </div>
    </div>
  );
};

export default SplitPane;
