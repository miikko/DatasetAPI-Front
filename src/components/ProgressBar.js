import React from 'react'
import '../stylesheets/ProgressBar.css'

const ProgressBar = (props) => {

  return (
    <div className='ProgressBar'>
      <div
        className='Progress'
        style={{ width: `${props.progress} %` }}
      />
    </div>
  )
}

export default ProgressBar