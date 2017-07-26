import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import ui from './ui'
import demo from './demo'

const reducers = combineReducers({
  demo,
  ui,
  routing: routerReducer
})

export default reducers
