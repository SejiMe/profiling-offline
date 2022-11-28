import clsx from 'clsx';
import React from 'react';

const InputNumberField = ({
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
    <div className={clsx('grid grid-flow-row', className)}>
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        type={type}
        value={value}
        name={name}
        className='rounded-md'
        onChange={inputTextHandler}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputNumberField;
