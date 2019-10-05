import React from 'react'
import FileUpload from './components/FileUpload'
import FileDownload from './components/FileDownload'
import ManageUploads from './components/ManageUploads'

const App = () => {
  return (
    <div className='App'>
      <div className='Card'>
        <FileUpload />
        <FileDownload />
        <ManageUploads />
      </div>
    </div>
  )
}

export default App
