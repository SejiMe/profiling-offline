import React from 'react';

const InputNumberField = ({
  label,
  className,
  name,
  type,
  value,
  getValue,
  required = false,
  pattern = '',
  placeholder = '',
  isRequired = false,
}) => {
  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    getValue({
      name,
      value,
    });
  };
  return (
    <div className='grid grid-flow-row'>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={inputTextHandler}
        pattern={pattern}
        required={isRequired}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputNumberField;
