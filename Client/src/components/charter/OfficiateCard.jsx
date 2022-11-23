import clsx from 'clsx';
import React from 'react';

function OfficiateCard({ name, position, className }) {
  return (
    <div
      className={clsx(
        'col-span-1 flex flex-col text-center shadow-md rounded-md py-2 border-2 w-48 h-full',
        className
      )}
    >
      <h4>{name}</h4>
      <span className='text-gray-400'>{position}</span>
    </div>
  );
}

export default OfficiateCard;
