import React from 'react'
import logoimg from '../assets/Logo.png'

const Logo = ({width = '100px'}) => {
  return (
    <img src={logoimg} alt="Logo Image" width={width} className="rounded-full animate-mymove"/>
  )
}

export default Logo