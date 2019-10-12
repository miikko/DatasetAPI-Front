import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import datasetsReducer from './reducers/datasetsReducer'

const reducer = combineReducers({
  user: userReducer,
  datasets: datasetsReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store