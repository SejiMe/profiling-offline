import React from 'react';
import clsx from 'clsx';

const Tr = ({ children, className, ...rest }) => {
  return (
    <tr {...rest} className={clsx('border-b-2 ', className)}>
      {children}
    </tr>
  );
};

export default Tr;
