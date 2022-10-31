import React from 'react';

const SplitPane = (props) => {
  return (
    //TODO UI
    <main className='flex flex-row h-screen w-screen'>
      <div className='w-40 h-screen'>{props.left}</div>
      <div className='w-full h-full'>{props.right}</div>
    </main>
  );
};

export default SplitPane;
