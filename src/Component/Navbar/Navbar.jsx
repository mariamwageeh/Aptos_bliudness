import React from 'react'
import styles from './Navbar.css';
import { Link } from 'react-router-dom';
import UpdateP from './../UpdateP/UpdateP';
export default function Navbar({userdata,Logout}) {
  let id= localStorage.getItem('Token')
  return <>
 <nav
  className="nav-handel navbar navbar-expand-xl navbar-light bg-light fixed-top">
  <div className="container nav-p">
  <Link className="navbar-brand " to=""><span className='logoo'>EyeCheck</span> <span className='pro'>Pro</span></Link>
    <button
      className="navbar-toggler d-lg-none"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapsibleNavId"
      aria-controls="collapsibleNavId"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="collapsibleNavId">



  {userdata !==null && localStorage.getItem('Role')==='Admin' ?  <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
        <li className="nav-item ">
          <Link className="nav-link" to="/alldoctors" aria-current="page">Show All Doctors</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link" to="/allpatiens" aria-current="page">Show All Patients</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link" to="/adddoctor" aria-current="page">Add Doctor</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link" to="/addrole" aria-current="page">Add Admin</Link>
        </li>
   </ul>: null}   
      
      

   {userdata !==null && localStorage.getItem('Role')==='User' ?  <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
       <li className="nav-item ">
          <Link className="nav-link" to="HomeP" aria-current="page">Home</Link>
        </li>
        
        
        
        <li className="nav-item ">
            <Link className="nav-link  " to="UploadImg" aria-current="page">Check whit AI</Link>
        </li>

        
      
        <li className="nav-item">
          <Link className="nav-link" to="Showobserve" aria-current="page">Showobserve</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="Showansweredobservation" aria-current="page">Answer Observation</Link>
        </li>



        <li className="nav-item">
          <Link className="nav-link " to="History" aria-current="page">History</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link " to='UpdateP' aria-current="page">Update</Link>
        </li>


        <li className="nav-item ">
          <Link className="nav-link " to="Profile" aria-current="page">My Profile</Link>
        </li>


   </ul>: null}   



     {userdata!==null && localStorage.getItem('Role')==='Doctor' ?   <>  <ul className="navbar-nav ms-auto mt-2 mt-lg-0"> 
      
        <li className="nav-item ">
          <Link className="nav-link  " to="UploadImg" aria-current="page">Check whit AI</Link>
      </li>

        <li className="nav-item">
          <Link className="nav-link  " to="Allappointment" aria-current="page">Allapppointment</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link " to="HistoryD" aria-current="page">MyHistory</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link " to="UpdateD" aria-current="page">Update</Link>
        </li>
        

        <li className="nav-item ">
          <Link className="nav-link " to="ProfileD" aria-current="page">My Profile</Link>
        </li>
     
        </ul></> :null} 



      <ul className="navbar-nav ms-auto mt-2 mt-lg-0">

{userdata===null ?<>
        <li className="nav-item">
          <Link className="nav-link " to="login" aria-current="page">Login</Link>
        </li>
      
        <li className="nav-item register">
          <Link className="nav-link text-light" to="register" aria-current="page">Register</Link>
        </li>

</>:<>


<li className="nav-item register">
          <span onClick={Logout} className="nav-link pointer text-light text-white  span" >Logout</span>
        </li>
        </>
}

        

      </ul>

    </div>
  </div>
 </nav>
 
    </>
}
