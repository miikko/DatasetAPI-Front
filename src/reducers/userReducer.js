

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('Login attempted')
      break
    case 'LOGOUT':
      console.log('Logout attempted')
      break
    default:
      return state
  }
}

export const login = (content) => {
  return {
    type: 'LOGIN',
    data: { content }
  }
}

export const logout = (content) => {
  return {
    type: 'LOGOUT',
    data: { content }
  }
}

export default userReducer