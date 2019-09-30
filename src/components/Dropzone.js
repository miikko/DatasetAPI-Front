import React, { useState } from 'react'
import '../stylesheets/Dropzone.css'

const Dropzone = (props) => {
  const [highlight, setHighlight] = useState(false)
  const fileInputRef = React.createRef()

  const openFileDialog = () => {
    if (!props.disabled) {
      fileInputRef.current.click()
    }
  }

  const onFilesAdded = (event) => {
    if (!props.disabled) {
      const fileList = event.target.files
      if (props.onFilesAdded) {
        const array = fileListToArray(fileList)
        props.onFilesAdded(array)
      }
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    if (!props.disabled) {
      setHighlight(true)
    }
  }

  const handleDragLeave = (event) => {
    setHighlight(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    if (!props.disabled) {
      const fileList = event.dataTransfer.files
      if (props.onFilesAdded) {
        const array = fileListToArray(fileList)
        props.onFilesAdded(array)
      }
      setHighlight(false)
    }
  }

  const fileListToArray = (files) => {
    const array = []
    for (let i = 0; i < files.length; i++) {
      array.push(files.item(i))
    }
    return array
  }

  return (
    <div
      className={`Dropzone ${highlight ? 'Highlight' : ''}`}
      onClick={openFileDialog}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{ cursor: props.disabled ? 'default' : 'pointer' }}
    >
      <img
        alt='upload'
        className='Icon'
        src='cloud_upload-24px.svg'
      />
      <input
        ref={fileInputRef}
        className='FileInput'
        type='file'
        multiple
        onChange={onFilesAdded}
      />
      <span>Upload Files</span>
    </div>
  )
}

export default Dropzone