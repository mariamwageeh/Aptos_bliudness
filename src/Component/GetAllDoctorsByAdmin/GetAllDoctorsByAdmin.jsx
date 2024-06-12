import React from 'react'
import axios from  "axios";
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './GetAllDoctorsByAdmin.css'

export default function GetAllDoctorsByAdmin() {


  const[doc,setdoc]=useState([]);
  const [load,setload]=useState(false);
  // const [token,setToken]=useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJraXJvYXNhYWQiLCJqdGkiOiI1MDQzY2IyYi01NTNhLTQyZGItYTZmZi02MzQ3NTEzZDI2ODEiLCJlbWFpbCI6Imtpcm9hc2FhZEBnbWFpbC5jb20iLCJHdWlkIjoiNDM3MmNiN2ItOWE1MC00NmNlLTkzNzgtZDNlMTkyMmM2MThjIiwicm9sZXMiOiJBZG1pbiIsImV4cCI6MTcxNjYzNzA3NSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.O-8zSEcOuZKc2I1Xi6TgZWNNvgTs4KuYmrG5fyIQ6AE');

  const token= localStorage.getItem('Token');




    async function getdoc(){
      setload(true)
      let {data}= await axios.get(`https://localhost:44389/api/Admin/GetAllDoctorsByAdmin` , { headers: { Authorization: `Bearer ${token}` } });
      setdoc(data);
      setload(false);
      console.log(data);
    }
   

  useEffect(()=>{
  getdoc();
  },[])
  async function deleteDoctor(id){
   let {data}= await axios.delete(`https://localhost:44389/api/admin/deletedoctor/${id}` , { headers: { Authorization: `Bearer ${token}` } });
    localStorage.removeItem('photo');
    getdoc();
    if(data.message == " Doctor has a current obervations You can not delete him until he finishes all his observations "){
      alert("Doctor has a current obervations You can not delete him until he finishes all his observations")
    }
  }

  
  return <>
  <div className="login-r-p">
    <div className="login-header-r">
        <header>All Doctor</header>
    </div>
  <>
  <div className="row k">
  {load?<div className='text-center'><i className='fas fa-spin fa-spinner fa-3x text-primary'></i></div>:<>
    {
      doc.map((doc)=> <div key={doc.userId} className='col-md-2 login-box-r-p'>
  
        <div className=' px-2 py-3 '>
        <img className='w-100' src={`data:image/png;base64,${doc.profileImg}`} alt='err'/>
          <span className='fw-bold '><span >{doc.firstName} {doc.lastName}</span></span>
            <div className="name-doc">
              <span >{doc.careerInfo}</span>
            </div>
            {/* <div className='input-submit-r'>
              <button onClick={()=>{deleteDoctor(doc.userId)}} className='submit-btn-r-r'><i className="fa-solid fa-trash"></i></button>
            </div> */}
            <div className='input-submit-r'>
<button onClick={()=>{deleteDoctor(doc.userId)}} className='submit-btn-r'><i className="fa-solid fa-trash"></i></button>
</div>
        </div>
      </div>
      )
    }</>}
  </div>
    </>
    </div>
  </>
}





