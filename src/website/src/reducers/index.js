import { combineReducers } from 'redux'
import shapes from './shapes'
import shapeFilter from './shapeFilter'

export default combineReducers({
  shapes,
  shapeFilter
})
