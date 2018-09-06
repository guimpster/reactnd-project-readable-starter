import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import DevTools from '../containers/DevTools'

import { getAllCategories } from '../actions'

// const logger = store => next => action => {
//   console.group(action.type)
//   console.info("dispatching", action)
//   let result = next(action)
//   console.log("next state", store.getState())
//   console.groupEnd(action.type)
//   return result
// };

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, createLogger()),
      DevTools.instrument()
    )
  )

  store.dispatch(getAllCategories())

  return store
}

export default configureStore
