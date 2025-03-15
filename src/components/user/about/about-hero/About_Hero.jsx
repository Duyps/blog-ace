import React from 'react'
import './hero.css'
function About_Hero() {
  return (
    <div className="about-hero">
        <div className="hero-container">
            <h1>
                ABOUT
                <br />
                BLOGACE
            </h1>
            <img src="https://assets.website-files.com/610af3ee7c0d51075e13a0c1/610af3ee7c0d51b0ca13a1b2_mukuko-studio-mU88MlEFcoU-unsplash-p-500.jpeg" alt="" className='image1' />
            <img src="https://assets.website-files.com/610af3ee7c0d51075e13a0c1/610af3ee7c0d51c53513a1b3_faizfajer-16tg31bVGlM-unsplash-p-500.jpeg" alt="" className='image2' />
            <img src="https://assets.website-files.com/610af3ee7c0d51075e13a0c1/610af3ee7c0d51002413a1b5_ellieelien-2DinZpReESM-unsplash-p-500.jpeg" alt="" className='image3'/>
        </div>
        <div className="background"></div>
    </div>
  )
}

export default About_Hero