import React from 'react'

const SplitPane = (props) => {
  return (
    //TODO Make split pane
    <main className='flex flex-row'>
        <div className="Splitpane-left">
            {props.left}
        </div>
        <div className="Splitpane-right">
            {props.right}
        </div>
    </main>
  )
}

export default SplitPane