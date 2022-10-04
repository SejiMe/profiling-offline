import React from 'react';
import ResidentItem from './ResidentItem';

const ResidentView = ({ label = 'Feature' }) => {
  return (
    <div className='h-full w-full'>
      <input type='text' placeholder='Search Resident Name' />
      <h2>{label}</h2>
      <div className=''>
        <ul className='flex flex-col gap-1'>
          <ResidentItem />
          <ResidentItem />
          <ResidentItem />
          <ResidentItem />
        </ul>
      </div>
    </div>
  );
};

export default ResidentView;
