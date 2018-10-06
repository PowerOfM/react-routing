import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

export const bindHistory = store => {
  history.listen((location, method) => {
    store.dispatch({ type: 'navigate', payload: { location, method } })
  })
}

export const navigate = (pathname, search, hash) => history.push({ pathname, search, hash })
export const navigateReplace = (pathname, search, hash) => history.replace({ pathname, search, hash })
export const navigateBack = () => history.goBack()

export default history
