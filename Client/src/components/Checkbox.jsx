import React from 'react';
import clsx from 'clsx';
//TODO Input Handler for Changes
export default function Checkbox({
  children,
  val = '',
  checkVal = false,
  getValue,
  name = '',
  iClassName = '',
}) {
  const handleCheckbox = (e) => {
    const { name, value, checked } = e.target;
    getValue({
      name,
      value,
      checked,
    });
  };

  return (
    <div className='flex flex-row items-center'>
      <input
        type='checkbox'
        value={val}
        name={name}
        checked={checkVal}
        onChange={handleCheckbox}
        className={clsx('rounded-3xl hover:cursor-pointer mr-1', iClassName)}
      />
      <label htmlFor={name}>{children}</label>
    </div>
  );
}
