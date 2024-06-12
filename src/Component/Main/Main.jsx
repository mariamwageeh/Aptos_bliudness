import React from 'react'
import styles from './Main.css'
import { Link } from 'react-router-dom'
import img from '../../images/Rectangle 3.png';

export default function Main() {

  return <>
  <div className="home-container">
    <div className="home-content">
      <h2>Unlock Your Vision Potential
        with Eye Check Pro!</h2>
      <p>Start your journey towards clearer vision and proactive 
      eye health management. Register or login now to access 
      personalized insights and take control of your eye care today!</p>

    <div className='home-pnt d-flex justify-content-center'>
       <div className="ptn-log ptn"><Link className="a a2" to="/Login">Log in</Link></div>
       <div className="ptn-reg ptn"><Link className="a a1" to="/Register">Register</Link></div>

    </div>

    </div>
    <div className="home-photo  position-relative">
      <div className="triangle"></div>
      <div className="photo d-flex justify-content-center">
        <img src={img} alt="" />
      </div>
    </div>
  </div>
  
  </>

}




