import clsx from 'clsx';
import React from 'react';

const TableNavigator = ({ children, className }) => {
  return (
    <div className={clsx('flex content-center items-center', className)}>
      {children}
    </div>
  );
};

export default TableNavigator;
