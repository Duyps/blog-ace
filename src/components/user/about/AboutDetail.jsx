import React from 'react'
import { Link } from 'react-router-dom'
import './about.css'
function AboutDetail() {
  return (
    <div className="about-detail">
        <div className="gallery">
            <img src="https://assets.website-files.com/610af3ee7c0d51075e13a0c1/610af3ee7c0d51867313a16a_pexels-gantas-vai%25C4%258Diul%25C4%2597nas-5657366%2520(2)-p-500.jpeg" alt=""className='img-1' />
            <img src="https://assets.website-files.com/610af3ee7c0d51075e13a0c1/610af3ee7c0d517bb313a169_lazarescu-alexandra-D_7HwWuOOzU-unsplash-p-500.jpeg" alt="" className='img-2' />
        </div>
        <div className="content">
            <div className="title">ABOUT US</div>
            <h2>Blog Ace is the largest Webflow blogging UI Kit</h2>
            <p>With 32 different pages, an elegant and minimal design, Blog Ace has all you need to showcase your writing and win new readers.</p>
            <button><Link to="/about">Learn more</Link></button>
        </div>
    </div>
  )
}

export default AboutDetail