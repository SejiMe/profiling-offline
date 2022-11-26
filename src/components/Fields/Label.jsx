import React from 'react';

const Label = ({ labelFor, children }) => {
  return <label htmlFor={labelFor}>{children}</label>;
};

export default Label;
