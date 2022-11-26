import clsx from 'clsx';
import React from 'react';

const Td = ({ children, className, ...rest }) => {
  return (
    <td className={clsx('whitespace-nowrap text-center', className)}>
      {children}
    </td>
  );
};

export default Td;
