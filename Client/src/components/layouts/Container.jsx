import React from 'react';
import { VIEW_TYPES as types } from '@/constants/getTypes';

const Container = ({ type = types.DEFAULT, children }) => {
  return (
    <>
      {type === types.DEFAULT && <DefaultView>{children}</DefaultView>}
      {type === types.RESIDENT && <ResidentView>{children}</ResidentView>}
    </>
  );
};

export default Container;

function DefaultView({ children }) {
  return (
    <main className='bg-slate-100 px-2 py-1 h-screen w-min-full'>
      <div className=' bg-slate-200 flex flex-col items-center justify-center  p-4'>
        {children}
      </div>
    </main>
  );
}

function ResidentView({ children }) {
  return (
    <main className='bg-green-100 px-8 py-8 h-screen w-min-full'>
      <div className=' bg-slate-50 flex flex-col items-center min-w-fill min-h-full justify-center rounded-lg  p-4'>
        {children}
      </div>
    </main>
  );
}
