import clsx from 'clsx';
import React from 'react';

const Th = ({ className, children, ...rest }) => {
  return <th className={clsx('w-10 h-10', className)}>{children}</th>;
};

export default Th;
