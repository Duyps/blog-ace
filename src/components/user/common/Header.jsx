import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'
function Header() {
  return (
    <header className='header'>
      <div className="logo">
        <Link to="/">
          <img src="https://cdn.prod.website-files.com/610af3ee7c0d51075e13a0c1/610fa265655efb0d99e81065_Blog_Ace_logo.svg" alt="" />
        </Link>
      </div>
      <nav>
        <li><Link to="/">Home</Link></li>
        <li><Link to="about">About</Link></li>
        <li><Link to="contact">Contact</Link></li>
      </nav>
    </header>
  )
}

export default Header