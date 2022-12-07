import clsx from 'clsx';
import React from 'react';

const Thead = ({ children, className }) => {
  return (
    <thead
      className={clsx('p-4 bg-gray-50 border-b-2 border-gray-200', className)}
    >
      {children}
    </thead>
  );
};

export default Thead;
