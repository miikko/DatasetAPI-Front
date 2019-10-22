import loginService from '../services/login'
import registerService from '../services/register'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const initializeUser = () => {
  return async (dispatch) => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      try {
        const user = JSON.parse(userJSON)
        dispatch({
          type: 'LOGIN',
          data: user
        })
      } catch (exception) {
        console.log(exception)
      }
    }
  }
}

export const login = (user) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login(user)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(loggedUser)
      )
      dispatch({
        type: 'LOGIN',
        data: loggedUser
      })
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedUser')
  return {
    type: 'LOGOUT',
    data: null
  }
}

export const registerUser = (user) => {
  return async (dispatch) => {
    try {
      await registerService.register(user)
      const loggedUser = await loginService.login(user)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(loggedUser)
      )
      dispatch({
        type: 'LOGIN',
        data: loggedUser
      })
    } catch (exception) {
      console.log(exception.response || exception)
    }
  }
}

export default userReducer