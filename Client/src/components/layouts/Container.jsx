import React from 'react';
import { VIEW_TYPES as types } from '@/constants/getTypes';
import clsx from 'clsx';

const Container = ({ type = types.DEFAULT, children, className }) => {
  return (
    <>
      {type === types.DEFAULT && (
        <DefaultView className={className}>{children}</DefaultView>
      )}
      {type === types.RESIDENT && (
        <ResidentView className={className}>{children}</ResidentView>
      )}
    </>
  );
};

export default Container;

function DefaultView({ children, className }) {
  return (
    <main
      className={clsx(
        'px-2 py-1 w-full h-full md:flex md:flex-row rounded-sm',
        className
      )}
    >
      {children}
    </main>
  );
}

function ResidentView({ children, className }) {
  return (
    <main
      className={clsx('bg-green-100 px-8 py-8 h-screen w-min-full', className)}
    >
      {children}
    </main>
  );
}
