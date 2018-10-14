import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from './history'

const Link = ({ className, to, href, children }) => (
  <a href={href || to} className={className} onClick={e => {
    e.preventDefault()
    navigate(to)
  }}>
    {children}
  </a>
)
Link.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.any
}

export default Link
