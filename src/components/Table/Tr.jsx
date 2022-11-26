import React from 'react';
import clsx from 'clsx';

const Tr = ({ children, className, ...rest }) => {
  return (
    <tr {...rest} className={clsx('', className)}>
      {children}
    </tr>
  );
};

export default Tr;
