import React, { useEffect } from 'react'
import FileUpload from './components/FileUpload'
import FileDownload from './components/FileDownload'
import RemoveUpload from './components/RemoveUpload'
import Login from './components/Login'
import Register from './components/Register'
import { connect } from 'react-redux'
import { initializeDatasets } from './reducers/datasetsReducer'
import { initializeUser, logout } from './reducers/userReducer'

const App = (props) => {
  const initDatasets = props.initializeDatasets
  const initUser = props.initializeUser

  useEffect(() => {
    initDatasets()
    initUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='App'>
      <div style={{ textAlign: 'center' }}>
        <h1>Dataset API Client</h1>
      </div>
      {props.user
        ? 
        <div>
          <div style={{ float: 'right' }}>
            <h3>Signed in as {props.user.username}</h3>
            <button onClick={(event) => props.logout()}>sign out</button>
          </div>
          <div className='Card'>
            <div>
              <h2>Upload dataset files</h2>
              <FileUpload />
            </div>
            <div>
              <h2>Remove uploaded datasets</h2>
              <RemoveUpload />
            </div>
          </div>
        </div>
        :
        <div>
          <h2>Authenicate</h2>
          <p>Creating an account lets you upload dataset files</p>
          <div>
            <Login />
          </div>
          <div style={{ marginTop: '20px' }}>
            <Register />
          </div>
        </div>
      }
      <div style={{ marginTop: '20px' }}>
        <h2>Download dataset files</h2>
        <FileDownload />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps, { initializeDatasets, initializeUser, logout})(App)
