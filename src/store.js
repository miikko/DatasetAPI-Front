import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import datasetsReducer from './reducers/datasetsReducer'
//import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  user: userReducer,
  datasets: datasetsReducer,
  //notifs: notificationReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store