import React, { useState } from 'react'
import DropZone from './Dropzone'
import ProgressBar from './ProgressBar'
import '../stylesheets/FileUpload.css'

const FileUpload = (props) => {
  const [uploading, setUploading] = useState(false)
  const [uploadSuccessfull, setUploadSuccessfull] = useState(false)
  const [files, setFiles] = useState([])
  const [uploadProgresses, setUploadProgresses] = useState({})

  const onFilesAdded = (addedFiles) => {
    setFiles(files.concat(addedFiles))
  }

  const renderProgressBar = (file) => {
    const uploadProgress = uploadProgresses[file.name]
    if (uploading || uploadSuccessfull) {
      return (
        <div className='ProgressWrapper'>
          <ProgressBar
            progress={uploadProgress ? uploadProgress.percentage : 0}
          />
          <div>
          <img
            className='CheckIcon'
            alt='done'
            src='check_circle_outline-24px.svg'
            style={{ opacity: uploadProgress && uploadProgress.state === 'done' ? 0.5 : 0 }}
          />
          </div>
        </div>
      )
    }
  }

  const handleSuccessfullUpload = () => {
    setFiles([])
    setUploadSuccessfull(false)
  }

  const sendRequest = (file) => {
    return new Promise((resolve, reject) => {
     const req = new XMLHttpRequest();
   
     req.upload.addEventListener("progress", event => {
      if (event.lengthComputable) {
       const copy = uploadProgresses
       copy[file.name] = {
        state: "pending",
        percentage: (event.loaded / event.total) * 100
       };
       setUploadProgresses(copy)
      }
     });
      
     req.upload.addEventListener("load", event => {
      const copy = uploadProgresses
      copy[file.name] = { state: "done", percentage: 100 };
      setUploadProgresses(copy)
      resolve(req.response);
     });
      
     req.upload.addEventListener("error", event => {
      const copy = uploadProgresses
      copy[file.name] = { state: "error", percentage: 0 };
      setUploadProgresses(copy)
      reject(req.response);
     });
   
     const formData = new FormData();
     formData.append("file", file, file.name);
   
     req.open("POST", "http://localhost:8000/datasets");
     req.send(formData);
    });
   }

  const uploadFiles = async () => {
    setUploadProgresses({})
    setUploading(true)
    const promises = []
    files.forEach(file => { promises.push(sendRequest(file)) }) 
    try {
      await Promise.all(promises)
    } catch (error) {
      console.log(error)
    }
    setUploadSuccessfull(true)
    setUploading(false)
  }

  const renderActions = () => {
    if (uploadSuccessfull) {
      return (
        <button onClick={handleSuccessfullUpload}>Clear</button>
      )
    } else {
      return (
        <button
          disabled={files.length <= 0 || uploading}
          onClick={uploadFiles}
        >
          Upload
        </button>
      )
    }
  }

  return (
    <div className='Upload'>
      <span className='Title'>Upload Files</span>
      <div className='Content'>
        <div>
          <DropZone
            onFilesAdded={onFilesAdded}
            disabled={uploading || uploadSuccessfull}
          />
        </div>
        <div className='Files'>
          {files.map(file => (
            <div key={file.name} className='Row'>
              <span className='Filename'>{file.name}</span>
              {renderProgressBar(file)}
            </div>
          ))}
        </div>
      </div>
      <div className='Actions'>
        {renderActions()}
      </div>
    </div>
  )
}

export default FileUpload