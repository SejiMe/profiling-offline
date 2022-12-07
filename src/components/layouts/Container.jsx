import React from 'react';
import { VIEW_TYPES as types } from '@/constants/getTypes';
import clsx from 'clsx';

const Container = ({ type = types.DEFAULT, children, className }) => {
  return (
    <>
      {type === types.DEFAULT && (
        <DefaultView className={className}>{children}</DefaultView>
      )}
      {type === types.ADMIN && (
        <AdminView className={className}>{children}</AdminView>
      )}
    </>
  );
};

export default Container;

function DefaultView({ children, className }) {
  return (
    <main
      className={clsx(
        'px-2 py-1 w-full h-full flex md:flex-row rounded-sm',
        className
      )}
    >
      {children}
    </main>
  );
}

function AdminView({ children, className }) {
  return (
    <main className={clsx('px-8 py-8 h-screen w-min-full', className)}>
      {children}
    </main>
  );
}
