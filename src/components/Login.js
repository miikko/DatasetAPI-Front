import React, { useState } from 'react'
import { login } from '../reducers/userReducer'
import { connect } from 'react-redux'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    const user = { username, password }
    props.login(user)
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type='text'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <input
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default connect(null, { login })(Login)