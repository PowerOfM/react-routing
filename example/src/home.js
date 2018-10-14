import React from 'react'
import { Link } from '@ionx/react-routing'

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <h1>Home Page</h1>
        <Link to='/home'>Home</Link>
        <Link to='/about'>About Us</Link>
      </div>
    )
  }
}
