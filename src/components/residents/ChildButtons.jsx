import clsx from 'clsx';
import React from 'react';
import Button from '../Button';

const ChildButtons = ({ children, className, ...rest }) => {
  return (
    <Button
      {...rest}
      className={clsx(
        'w-full h-10 border cursor-pointer bg-transparent hover:bg-sky-50 focus:bg-sky-200 rounded-lg ',
        className
      )}
    >
      {children}
    </Button>
  );
};

export default ChildButtons;
