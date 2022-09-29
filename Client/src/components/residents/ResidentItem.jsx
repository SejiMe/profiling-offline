import React from 'react';

const ResidentItem = ({ name, key }) => {
  return (
    <>
      <li className='w-full h-10 px-2 py-1 bg-slate-300 hover:border-l-8 hover:border-green-700 '>
        <h4>Resident Name</h4>
      </li>
    </>
  );
};

export default ResidentItem;
