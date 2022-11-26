import Link from 'next/link';
import React from 'react';
import Info from './../svg/icons8-info-26.svg';

function ResidentItem(props) {
  return (
    <>
      <li className='flex justify-between w-[80%] gap-3 pr-10 h-10 px-2 py-1 bg-slate-300 hover:border-l-8 hover:border-green-700 '>
        <h4>{props.id}</h4>
        <h4>{props.fname}</h4>
        <h4>{props.mName}</h4>
        <h4>{props.lname}</h4>
        {/* ICON Should be here */}
        <Link href={'/admin/residents/' + props.id} className=''>
          <a>
            <Info />
          </a>
        </Link>
      </li>
    </>
  );
}

export default ResidentItem;
