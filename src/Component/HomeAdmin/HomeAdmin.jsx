import React from 'react';
import styles from './HomeAdmin.css';
import { Link } from 'react-router-dom';



export default function HomeAdmin() {
  return (
    <div className="login-r ch-margin">
    <div className="ch-ai-a">
      <div className="login-header-r">
        <header>Admin</header>
      </div>
        <div className="input-submit-r">
          <Link className=" a2-ad " to="/alldoctors"><div className=" submit-btn-r">Show All Doctors</div></Link>
        </div>
        <div className="input-submit-r">
          <Link className=" a2-ad" to="/allpatiens"><div className="submit-btn-r">Show All Patients</div></Link>
        </div>
        <div className="input-submit-r">
          <Link className=" a2-ad" to="/adddoctor"><div className="submit-btn-r">Add Doctor</div></Link>
        </div>
        <div className="input-submit-r">
          <Link className=" a2-ad" to="/addrole"><div className="submit-btn-r">Add Admin</div></Link>
        </div>
   
    
      
    </div>
    </div>
  );
}




{/* <>
  <Link className="a a1" to="/alldoctors"><div className="ptn-reg ptn">Show All Doctors</div></Link>
  <Link className="a a1" to="/allpatiens"><div className="ptn-reg ptn">Show All Patients</div></Link>
  <Link className="a a1" to="/adddoctor"><div className="ptn-reg ptn">Add Doctor</div></Link>
  <Link className="a a1" to="/addrole"><div className="ptn-reg ptn">Add Admin</div></Link>
  </> */}

