import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'

// Import Reducers
import commentReducer from './reducers/commentReducer'
import favReducer from './reducers/favReducer'
import userReducer from './reducers/userReducer'

const reducers = combineReducers({ comments: commentReducer, fav_trails: favReducer, user: userReducer })
export default () => createStore(reducers, applyMiddleware(thunkMiddleware, logger))