import clsx from 'clsx';
import React from 'react';

const InputText = ({ className, name, type, value, getValue }) => {
  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    getValue({
      name,
      value,
    });
  };

  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={inputTextHandler}
      className={clsx('rounded-sm p-2 w-56', className)}
    />
  );
};

export default InputText;
