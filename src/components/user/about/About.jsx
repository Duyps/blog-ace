import React from 'react'
import About_Hero from './about-hero/About_Hero'
import Infor from './about-introduce/Infor'
import PageAnimation from '../common/PageAnimation'

function About() {
  return (
    <PageAnimation>
      <About_Hero/>
      <Infor/>
    </PageAnimation>
  )
}

export default About