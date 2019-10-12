import React, { useEffect } from 'react'
import FileUpload from './components/FileUpload'
import FileDownload from './components/FileDownload'
import RemoveUpload from './components/RemoveUpload'
import { connect } from 'react-redux'
import { initializeDatasets } from './reducers/datasetsReducer'

const App = (props) => {

  useEffect(() => {
    props.initializeDatasets()
  }, [])

  return (
    <div className='App'>
      <div className='Card'>
        <FileUpload store={props.store} />
        <FileDownload />
        <RemoveUpload store={props.store} />
      </div>
    </div>
  )
}

export default connect(null, { initializeDatasets })(App)
