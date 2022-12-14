import React from 'react';
import { RotateLoader } from 'react-spinners';
import { useMedia } from 'react-use';
import Sidebar from './Sidebar';
import SplitPane from './SplitPane';

const AdminLayout = ({ children }) => {
  const isMobile = useMedia('(max-width: 580px)');

  return (
    <>
      {isMobile ? (
        <div className='container h-screen flex flex-col justify-center items-center align-middle'>
          <RotateLoader size={100} />
          <h3 className='mt-10 text-center'>
            Please Rotate Your Phone to use this feature
          </h3>
        </div>
      ) : (
        <>
          <SplitPane left={<Sidebar />} right={children} />
        </>
      )}
    </>
  );
};

export default AdminLayout;
