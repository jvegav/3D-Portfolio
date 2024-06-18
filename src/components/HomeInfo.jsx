import React from 'react'
import Projects from '../pages/Projects'
import { Link } from 'react-router-dom'
import {arrow} from '../assets/icons'
import InfoBox from './InfoBox'

const renderConstant = {
    1: (
      <h1 className='"sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        Hi, I am <span className='font-semibold'>Josue</span>
        <br/>
        A SoftWare Engineer From Colombia
      </h1>
    ),
    2: (
        <InfoBox 
        text="Worked with many companies an pick up many skills along the way "
        link = "/about"
        btnText="Learn More"
        />
        
    ),
    3: (
        <InfoBox 
        text="Led Multiple projects to success, curious about the impact? "
        link = "/projects"
        btnText="Visit my Portfolio"
        />
    ),
    4: (
        <InfoBox 
        text="Need a project done or looking for a dev ? I'm just a few keystrokes away "
        link = "/contact"
        btnText="Let's Talk"
        />
    ),


}

const HomeInfo = ({currentStage}) => {
  return renderConstant[currentStage] || null
}

export default HomeInfo