import React from 'react'
import { Link } from 'react-router-dom'
import './writter.css'
function Writter({pic, name}) {
  return (
    <div className="writter">
    <div className="infor">
        <img src={pic} alt="Authetic-picture" />
        <div className="name">
            <p>Written by</p>
            <h2>{name}</h2>
        </div>
    </div>
    <div className="more">
        <button><Link to='/'>POPULAR</Link></button>
        <button><Link to='/'>QUICK TIPS</Link></button>
        <button><Link to='/'>EXPERT ADVICE</Link></button>
    </div>
    <div className="social">
        <a href="https://www.facebook.com/"><i class="fa-brands fa-facebook"></i></a>
        <a href="https://www.instagram.com"><i class="fa-brands fa-instagram"></i></a>
        <a href="https://X.com"><i class="fa-brands fa-x-twitter"></i></a>
    </div>
    </div>
  )
}

export default Writter