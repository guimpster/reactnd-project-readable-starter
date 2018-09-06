import { combineReducers } from 'redux'
import categories/*, * as fromCategories*/ from './categories'
import comments from './comments'
import posts from './posts'

export default combineReducers({
  categories,
  comments,
  posts
})