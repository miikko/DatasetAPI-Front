const initialState = {
  message: '',
  visible: false
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REMOVE_DATASET':
      return {
        message: 'Dataset was removed successfully',
        visible: true
      }
    case 'ADD_DATASET':
      return {
        message: 'Dataset was added successfully',
        visible: true
      }
    case 'HIDE_NOTIFICATION':
      return {
        message: '',
        visible: false
      }
    case 'SHOW_NOTIFICATION':
      return {
        message: action.data.message,
        visible: true
      }
    default:
      return state
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
    data: {}
  }
}

export default notificationReducer