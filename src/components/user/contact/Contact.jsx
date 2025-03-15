import React from 'react'
import './contact.css'
import PageAnimation from '../common/PageAnimation'
function Contact() {
  return (
    <PageAnimation>
      <div className="contact">
          <div className="contact-hero">
              <h1>
                  CONTACT 
                  <br />
                  BLOGACE
              </h1>
              <img src="https://assets.website-files.com/610af3ee7c0d51075e13a0c1/610af3ee7c0d51ffe313a1bf_faizfajer-16tg31bVGlM-unsplash-(3)-p-500.jpeg" alt="" />
              <div className="background"></div>
          </div>
          <div className="email">
            <h1>
              WRITE AN 
              <br />
              EMAIL TO 
            </h1>
            <a href="mailto:example@email.com">contact@gmail.com</a>

          </div>
      </div>
    </PageAnimation>
  )
}

export default Contact