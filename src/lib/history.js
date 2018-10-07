import createBrowserHistory from 'history/createBrowserHistory'

let _listenerRegistered = false

export const history = createBrowserHistory()

export const bindHistory = store => {
  _listenerRegistered = true

  history.listen((location, method) => {
    store.dispatch({ type: 'navigate', payload: { location, method } })
  })
}

export const navigate = (pathname, search, hash) => history.push({ pathname, search, hash })
export const navigateReplace = (pathname, search, hash) => history.replace({ pathname, search, hash })
export const navigateBack = () => history.goBack()

export const isHistoryListenerRegistered = () => _listenerRegistered
export const historyListenerRegistered = () => { _listenerRegistered = true }
