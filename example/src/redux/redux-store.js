import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'
import reduxPromiseMiddleware from 'redux-promise-middleware'
import { bindHistory, LocationReducer } from '@ionx/react-routing'

const logger = store => next => action => {
  console.info('>> ' + action.type, action.payload)
  return next(action)
}

const reducers = combineReducers({
  location: LocationReducer
})

export const store = createStore(
  reducers,
  {}, // Initial state
  compose(
    applyMiddleware(
      reduxThunk,
      reduxPromiseMiddleware(),
      logger
    )
  )
)

// Connect to store
bindHistory(store)
