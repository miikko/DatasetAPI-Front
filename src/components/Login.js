import React, { useState } from 'react'
import loginService from '../services/login'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({
        username, password
      })
      props.setUser(loggedUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong username or password')
      console.log(exception)
    }
    return 'foo'
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
          type='text'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default Login