import clsx from 'clsx';

import React from 'react';

function Th({ children, className = '', ...rest }) {
  return (
    <>
      <th {...rest} className={clsx('', className)}>
        {children}
      </th>
    </>
  );
}

export default Th;
