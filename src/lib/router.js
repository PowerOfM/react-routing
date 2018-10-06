import React from 'react'
import toRegex from 'path-to-regexp'
import history, { navigateReplace } from './history'

export default class Router extends React.Component {
  constructor (props) {
    super(props)

    // Compute route regexes
    this.routes = {}
    this.routePaths = Object.keys(props.routes)
    this.routePaths.forEach(path => {
      const action = props.routes[path].action || props.routes[path]
      const guard = props.routes[path].guard || null
      const keys = []
      const pattern = toRegex(path, keys, { end: false })

      this.routes[path] = { pattern, keys, action, guard }
    })

    // Convert root to regex if not already
    let root = props.root
    if (root && !(root instanceof RegExp)) {
      root = toRegex(root, [], { end: false })
    }

    this.state = {
      root,
      route: null,
      pathname: window.location.pathname,
      redirect: ''
    }
  }

  componentDidMount () {
    this.updateRoute(history.location.pathname)
  }

  componentWillReceiveProps (nextProps) {
    // On path change, update route
    if (this.state.pathname !== nextProps.location.pathname) {
      return this.updateRoute(nextProps.location.pathname)
    }

    // If there is already a route, check the auth/anon requirements
    if (this.state.route && this.state.route.guard) {
      this.state.route.guard(nextProps)
    }
  }

  updateRoute (pathname) {
    // Trim off root from pathname
    let relativePathname = pathname
    let trimmedRoot = ''
    if (this.state.root) {
      let rootResult = this.state.root.exec(pathname)
      if (rootResult) {
        relativePathname = pathname.substr(rootResult[0].length)
        trimmedRoot = rootResult[0]
      }
    }

    // Loop through routes to find match
    for (let i = 0; i < this.routePaths.length; i++) {
      let routePath = this.routePaths[i]
      let route = this.routes[routePath]
      let match = route.pattern.exec(relativePathname)
      if (!match) continue

      // Parse params
      let params = {}
      for (let i = 1; i < match.length; i++) {
        if (match[i] !== undefined) {
          params[route.keys[i - 1].name] = match[i]
        }
      }

      // Handle redirects if the action is a string
      if (typeof route.action === 'string') {
        let redirect = route.action

        // Fill in missing params
        if (match.length > 0) {
          for (let key of route.keys) {
            redirect = redirect.replace(':' + key, params[key])
          }
        }

        // Include any trimmed off root portion and redirect
        console.log(`@router/UPDATE redirecting to ${redirect}`)
        return navigateReplace(trimmedRoot + redirect, history.location.search)
      }

      // Check route guard
      if (route.guard && !route.guard(this.props)) return
      console.log(`@router/UPDATE ${pathname}`)

      // Return matched route
      return this.setState({ route, pathname, relativePathname, params })
    }

    throw new Error(`Failed to find route for path: ${pathname}. (router: ${this.props.root || '/'})`)
  }

  render () {
    const { route, relativePathname, params } = this.state

    // Show loading screen for initial state/redirects
    if (!route || typeof route.action !== 'function') {
      if (this.props.loader) return this.props.loader(this.props)
      return null
    }

    // Merge location objects from parent routers with local data
    const location = {
      ...this.props.location,
      relativePathname,
      params: {
        ...this.props.location.params,
        ...params
      }
    }

    const Component = route.action
    return <Component {...this.props} location={location} />
  }
}
