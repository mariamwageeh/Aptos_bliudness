import React from 'react'
import styles from './Footer.css';
import { Link } from 'react-router-dom';
import logo from '../../images/Vector.png'


export default function Footer() {
  return <>
  <div className='color'>
  <div className="foo-content">
    <div className="foo-logo d-flex justify-content-center "  >
      <img src={logo} alt="logo" />
      <span className='f-logo'>EyeCheck</span><samp className='e-logo'>Pro</samp>
    </div>
  </div>
  <div className="foo-icons d-flex justify-content-center">

    <div className='foo-icon'><i class="fa-brands fa-facebook"></i></div>
    <div className='foo-icon'><i class="fa-brands fa-twitter"></i></div>
    <div className='foo-icon'><i class="fa-brands fa-instagram"></i></div>
  </div>
  <div className="line"></div>
  <div className="foo-c">© 2024 Eye Check Pro. All rights reserved.</div>

  </div>

  </>
}
