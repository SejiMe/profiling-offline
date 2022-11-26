import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export default function RadioButton({
  label,
  name,
  value,
  src,
  alt,
  getValue,
  className,
  checkedVal,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('inside Radio Component:' + value);
    getValue({ name, value });
  };
  return (
    <>
      <label className={clsx('flex flex-1 flex-col justify-center', className)}>
        <input
          type='radio'
          className='peer opacity-0 cursor-pointer'
          name={name}
          value={value}
          onChange={handleChange}
        />
        <div className='w-full h-full cursor-pointer grid grid-flow-col justify-center items-center border-black border-2 rounded-lg peer-checked:border-green-400 hover:border-blue-200 bg-white p-5'>
          <Image src={src} alt={alt} className='w-full h-full' />
        </div>
        {<h3 className='cursor-pointer text-center'>{label}</h3>}
      </label>
    </>
  );
}
