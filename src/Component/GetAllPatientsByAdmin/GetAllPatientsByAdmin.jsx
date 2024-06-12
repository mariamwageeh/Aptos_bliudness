import React from 'react'
import axios from  "axios";
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './GetAllPatientsByAdmin.css'


export default function GetAllPatientsByAdmin() {


  const[patient,setpetient]=useState([]);
  const [load,setload]=useState(false);
  // const [token,setToken]=useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJraXJvYXNhYWQiLCJqdGkiOiI1MDQzY2IyYi01NTNhLTQyZGItYTZmZi02MzQ3NTEzZDI2ODEiLCJlbWFpbCI6Imtpcm9hc2FhZEBnbWFpbC5jb20iLCJHdWlkIjoiNDM3MmNiN2ItOWE1MC00NmNlLTkzNzgtZDNlMTkyMmM2MThjIiwicm9sZXMiOiJBZG1pbiIsImV4cCI6MTcxNjYzNzA3NSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.O-8zSEcOuZKc2I1Xi6TgZWNNvgTs4KuYmrG5fyIQ6AE');
  const token= localStorage.getItem('Token');

  async function deletePatient(id){
    await axios.delete(`https://localhost:44389/api/admin/deletepatient/${id}` , { headers: { Authorization: `Bearer ${token}` } });
    localStorage.removeItem('photo');
    getPatient();
  }



    async function getPatient(){
      setload(true)
      let {data}= await axios.get(`https://localhost:44389/api/Admin/GetAllPatientsByAdmin` , { headers: { Authorization: `Bearer ${token}` } });
      setpetient(data);
      setload(false);
      console.log(data);
    }
   

  useEffect(()=>{
  getPatient();
  },[])


  
  return <>
  <div className="login-r-p">
    <div className="login-header-r">
        <header>All Patiens</header>
    </div>
  <>
  <div className="row k">
  {load?<div className='text-center'><i className='fas fa-spin fa-spinner fa-3x text-primary'></i></div>:<>
    {
      patient.map((patient)=> <div key={patient.userId} className='col-md-2 login-box-r-p'>
  
        <div className=' px-2 py-3 '>
        <img className='w-100' src={`data:image/png;base64,${patient.profileImg}`} alt='err'/>
        <span className='fw-bold '><span >{patient.firstName} {patient.lastName}</span></span>
            <div className="name-doc">
              <span >{patient.email}</span>
            </div>
            {/* <div className='input-submit-r'>
              <button onClick={()=>{deletePatient(patient.userId)}} className='submit-btn-r-r'>delete</button>
            </div> */}

            <div className='input-submit-r'>
<button onClick={()=>{deletePatient(patient.userId)}} className='submit-btn-r'><i className="fa-solid fa-trash"></i></button>
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

{/* <>
  <h1 className='text-center doc'>Patients</h1>
  <div className="row k">
    {load?<div className="text-center"><i className='fas fa-spin fa-spinner fa-3x text-success'></i></div>:<>
      {
        patient.map((patient)=> <div className='col-md-2 card c' key={patient.userId}>
          <div className='px-2 py-3'>
            <img className='w-100 ' src={`data:image/png;base64,${patient.profileImg}`} alt='err'/>
            <h3 className='h6'>{patient.username}</h3>
            <div className="d-flex justify-content-between">
              <span className="text-success">{patient.username}</span>
              <span><i className='fa fa-star'></i>{patient.ratingsAverage}</span>
            </div>
            <button onClick={()=>{deletePatient(patient.userId)}} className='btn bg-primary text-white  w-100'>delete</button>
          </div>
        </div>)
      }
    </>
    }
  </div>
  </>  */}
