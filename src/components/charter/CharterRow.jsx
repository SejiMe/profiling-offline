import clsx from 'clsx';
import React from 'react';

export default function CharterRow({ children, className }) {
  return <div className={clsx('grid grid-cols-3', className)}>{children}</div>;
}
