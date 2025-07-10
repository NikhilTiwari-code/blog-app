import React from 'react'
import blogLogo from '../assets/blog-logo.svg'

function Logo({width = '100px'}) {
  return (
    <img src={blogLogo} alt="Blog Logo" style={{width}} />
  )
}

export default Logo