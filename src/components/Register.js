import React, { useState } from 'react'
import { registerUser } from '../reducers/userReducer'
import { connect } from 'react-redux'

const Register = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = (event) => {
    event.preventDefault()
    const user = { username, password }
    props.registerUser(user)
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleRegister}>
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
      <button type='submit'>register</button>
    </form>
  )
}

export default connect(null, { registerUser })(Register)