import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import React from 'react';

const TippyTooltip = ({ className, children, content }) => {
  return (
    <Tippy
      content={content}
      className={clsx('p-2 rounded-md bg-white shadow-md', className)}
    >
      {children}
    </Tippy>
  );
};

export default TippyTooltip;
