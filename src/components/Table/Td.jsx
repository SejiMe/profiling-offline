import clsx from 'clsx';
import React from 'react';

const Td = ({ children, className, ...rest }) => {
  return (
    <td
      className={clsx(
        'border-2 whitespace-nowrap text-center p-1.5',
        className
      )}
    >
      {children}
    </td>
  );
};

export default Td;
