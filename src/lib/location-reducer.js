const DEFAULT = {
  pathname: window.location.pathname,
  search: '',
  hash: '',
  method: 'PUSH'
}

export default (state = DEFAULT, action) => {
  if (action.type === 'navigate') {
    const { location, method } = action.payload
    return {
      ...state,
      ...location,
      method
    }
  }
  return state
}
