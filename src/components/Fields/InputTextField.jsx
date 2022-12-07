import clsx from 'clsx';
import React from 'react';

const InputTextField = ({
  label,
  className,
  name,
  type,
  value,
  getValue,
  placeholder = '',
  ...rest
}) => {
  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    getValue({
      name,
      value,
    });
  };
  return (
    <div className={clsx('flex flex-col', className)}>
      <label className='ml-1' htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        className='rounded-md'
        onChange={inputTextHandler}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default InputTextField;
