import React from 'react';

const SplitPane = (props) => {
  return (
    //TODO Make split pane
    <main className='flex flex-row h-screen w-screen'>
      <div className='Splitpane-left w-40 h-screen'>{props.left}</div>
      <div className='Splitpane-right w-full h-full'>{props.right}</div>
    </main>
  );
};

export default SplitPane;
