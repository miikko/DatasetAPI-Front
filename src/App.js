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

  useEffect(() => {
    props.initializeDatasets()
    props.initializeUser()
  }, [])

  return (
    <div className='App'>
      {props.user
        ? 
        <div>
          <div>
            <h3>Signed in as {props.user.username}</h3>
            <button onClick={(event) => props.logout()}>sign out</button>
          </div>
          <div className='Card'>
            <FileUpload />
            <FileDownload />
            <RemoveUpload />
          </div>
        </div>
        :
        <div>
          <Login />
          <Register />
        </div>
      }
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
