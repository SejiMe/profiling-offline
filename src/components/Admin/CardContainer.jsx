import clsx from 'clsx';
import React from 'react';

const CardContainer = ({ className, children }) => {
  return (
    <div
      className={clsx(
        'border shadow-md rounded-lg flex flex-col p-4 gap-2 w-[48%] text-center text-black bg-slate-200',
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardContainer;
