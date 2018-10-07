import React from 'react'
import { navigate } from '@ionx/react-routing'

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <h1>Home Page</h1>
        <button onClick={() => navigate('/home')}>Home</button>
        <button onClick={() => navigate('/about')}>About Us</button>
      </div>
    )
  }
}
