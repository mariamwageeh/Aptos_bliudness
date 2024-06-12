import React from 'react'
import styles from './ProfileD.css';
import axios from  "axios";
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
export default function ProfileD() {
  const[doc,setdoc]=useState([]);
  const [load,setload]=useState(false)
    async function getdoc(){
      setload(true)
      const token= localStorage.getItem('Token');
      let id=localStorage.getItem('Userid')
     try{
      let {data}= await axios.get(`https://localhost:44389/api/Doctor/ShowProfile/${id}`,  { headers: { Authorization: `Bearer ${token}` } });
     setdoc(data)
    //  localStorage.setItem('photo',data.profileImg)
    //  console.log(localStorage.getItem('photo'))
     setload(false)
    console.log(data)
  }
    catch (error) {
      // Handle errors
      console.error('report error:', error);
      if (error.response && error.response.status === 400) {
        alert('You Are not Register or Login Again');
      }
    }
    
    }
   

  useEffect(()=>{
  getdoc();
  },[])

  return <>
    <div className="login-r">
    <div className="profile-box">
      <div className="login-header-r">
        <header>Profile</header>
      </div>
      <img className='pho' src={`data:image/png;base64,${doc.profileImg}`} alt='err'/>


      <div className="input-box-r-p">
        <h4 className='input-field-r-p pro-info'> Email: {doc.email}</h4>
      </div>
      <div className="input-box-r-p">
      <h4 className='pro-info'> Frist Name: {doc.firstName}</h4>
      </div>
      <div className="input-box-r-p">
      <h4 className='pro-info'> Last Name: {doc.lastName}</h4>
      </div>
      <div className="input-box-r-p">
      <h4 className='pro-info'> Phone Number: {doc.phoneNumber}</h4>
      </div>
      <div className="input-box-r-p">
      <h4 className='pro-info'> User Name: {doc.username}</h4>
      </div>
      <div className="input-box-r-p">
      <h4 className='pro-info'> Career Info: {doc.careerInfo}</h4>
      </div>
      



      </div>
    </div>

  </>
}


