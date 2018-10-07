import { history, navigateReplace } from './history'

const REDIRECT_START_REGEX = /^\?redirect=([\w%\d-]+)/
const REDIRECT_MID_REGEX = /&redirect=([\w%\d-]+)/

export default {
  authOnly: (loginUrl = '/login', test = (props => props.auth.valid)) => props => {
    if (test(props)) return true

    let query = ''
    if (history.location.pathname !== '/') {
      if (history.location.search) {
        query = history.location.search + '&'
      } else {
        query = '?'
      }
      query += 'redirect=' + encodeURIComponent(history.location.pathname)
    }

    navigateReplace(loginUrl, query)
    return false
  },

  anonOnly: (rootUrl = '/', test = (props => props.auth.valid)) => props => {
    if (!test(props)) return true

    let redirect = ''
    let query = history.location.search

    let result = REDIRECT_START_REGEX.exec(query)
    if (result) {
      redirect = decodeURIComponent(result[1])
      query = query.substr(result[0].length + 1)
      if (query) query = '?' + query
    } else {
      result = REDIRECT_MID_REGEX.exec(query)
      if (result) {
        redirect = decodeURIComponent(result[1])
        query = query.substring(0, result.index) + query.substring(result.index + result[0].length)
      }
    }

    navigateReplace(redirect || rootUrl, query)
    return false
  }
}
