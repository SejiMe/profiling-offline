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
    <div className={clsx('grid grid-flow-row', className)}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={inputTextHandler}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default InputTextField;
