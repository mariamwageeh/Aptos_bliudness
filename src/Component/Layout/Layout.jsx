import React from 'react'
import styles from './Layout.css';
import Navbar from './../Navbar/Navbar';

import Footer from './../Footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
export default function Layout({userdata,setuserdata}) {
  let navigate=useNavigate();

  function Logout(){
    localStorage.removeItem('Token');
    localStorage.removeItem('Userid');
    localStorage.removeItem('Role');
    localStorage.removeItem('observationId');
    localStorage.removeItem('report');
    // localStorage.removeItem('photo');
    setuserdata(null);
    navigate('/');
  }
  

  return <>
  <Navbar userdata={userdata}  Logout ={Logout}/>
  <div className='container handle'>
    <Outlet></Outlet>
  </div>
  <Footer/>
    </>
}
