import React from 'react'
import clsx from 'clsx';
//TODO Continue at home
export default function Checkbox({children, val='', name='', iClassName = '',}) {
  return (
    <div className='flex flex-row items-center'>
        <input type="checkbox" value={val} name={name} className={clsx('rounded-3xl hover:cursor-pointer mr-1', iClassName)} />
        <label htmlFor={name}>{children}</label>
    </div>
  )
}
