import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from '@ionx/react-routing'

import { store } from './redux/redux-store'
import connect from './redux/redux-connect'
import About from './about'
import Home from './home'
import './index.css'

const ConnectedRouter = connect(Router)

const App = (
  <Provider store={store}>
    <ConnectedRouter routes={{
      '/home': Home,
      '/about': About,
      '': '/home' // Default handler redirects to /home
    }} />
  </Provider>
)

render(App, document.getElementById('root'))
