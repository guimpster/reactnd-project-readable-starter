import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import DevTools from '../containers/DevTools'

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, createLogger()),
      DevTools.instrument()
    )
  )

  return store
}

export default configureStore
