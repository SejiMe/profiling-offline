import clsx from 'clsx';
import React from 'react';

const Th = ({ className, children, ...rest }) => {
  return (
    <th className={clsx('p-2 ', className)} {...rest}>
      {children}
    </th>
  );
};

export default Th;
