import React from 'react'
import styles from './Allappointment.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Acceptappointment from '../Acceptappointment/Acceptappointment'

export default function Allappointment() {
  const[observe,setobserve]=useState([]);
  const [load,setload]=useState(false)

    async function getobserve(){
      setload(true)
      const token= localStorage.getItem('Token');
     const id=localStorage.getItem('Userid')
  

      let {data}= await axios.get(`https://localhost:44389/api/doctor/showobservationsbydoctor/${id}`, { headers: { Authorization: `Bearer ${token}` } });
     setobserve(data)
     setload(false)

// else{
//   alert('Observation already accepted')
// }

  console.log(data)
  

    }
  

  useEffect(()=>{
  getobserve();
  },[])

  async function acceptappoint(id) {
    try {
      const token = localStorage.getItem('Token');
      const response = await axios.put(
        `https://localhost:44389/api/doctor/acceptrequest/${id}`,
        { status: 1 }, // JSON payload with status set to 1
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
  
      console.log(response.data);
      getobserve();
    } catch (error) {
      console.error('Accept appointment error:', error);
      if (error.response && error.response.status === 400) {
        alert('Observation already accepted');
      }
    }
  }
  


  // async function rejectappoint(id) {
  //   try {
  //     const token = localStorage.getItem('Token');
  //     const response = await axios.put(
  //       `https://localhost:44389/api/doctor/acceptrequest/${id}`,
  //       { status: 0 }, // JSON payload with status set to 1
  //       { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
  //     );
  
  //     console.log(response.data);
  //     getobserve();
  //   } catch (error) {
  //     console.error('Accept appointment error:', error);
  //     if (error.response && error.response.status === 400) {
  //       alert('Observation already accepted');
  //     }
  //   }
  // }
  
  async function showfeedback(id) {
    try {
      const token = localStorage.getItem('Token');
      const response = await axios.get(
        `https://localhost:44389/api/doctor/showfeedback/${id}`,
        {
          headers: { 
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json' 
          }
        }
      );
  alert(response.data);
      console.log(response.data);
      getobserve();
    } catch (error) {
      // console.error('Accept appointment error:', error);
      if (error.response && error.response.status === 400) {
        alert('No Feedback Made by Patient');
      }
    }
  }
  

//   async function  report(id){
//     // try{
//     // setload(true)
//     const token= localStorage.getItem('Token');
//   //  const observationId=localStorage.getItem('observationId');

//     // let {data}= await axios.put(`https://localhost:44389/api/Patient/Delete/${observationId}`,
//     //  { headers: { Authorization: `Bearer ${ localStorage.getItem('Token')}` } });
//     const response = await axios.put(
//       `https://localhost:44389/api/Doctor/Repot/${id}`, [],// Update the URL here
     
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
 
//   //  setdel(data)
//   //  setload(false)

//   console.log(response.data);

// // }catch(error){
// //   console.error('Update error:', error.data);
// // }
  
//   }

  return <>
   <div className="login-r-p">
    <div className="login-header-r">
        <header>All Appointment</header>
    </div>
 <>
  <div className="row">
  {load?<div className='text-center'><i className='fas fa-spin fa-spinner fa-3x text-primary'></i></div>:<>
    {
      observe.map((observe)=><div key={observe.observationId} className='col-md-2 login-box-r-pa '>
{/* {localStorage.getItem('report')?null} */}
<><div className=' px-2 py-3'>
      {/* <Link to={`/ProDetails/${observe.observetorId}`}> */}
{/* <h2>{props.report}</h2> */}
<img style={{ width: '150px', height: '150px' }} src={`data:image/png;base64,${observe.medicalRedation}`} alt='patient deleted' />
        <span className='fw-bold '>doctor name:{observe.doctorName}</span>
        <h3 className='h6'>Patient Name:{observe.patientName.split(' ').slice(0,2).join(' ')}</h3>
        <h3 className="h6">  diagnosis:  {observe.diagnosis}/4</h3>
        <h3 className="h6">  Patient Record:  {observe.medicalRecord}</h3>
       {observe.report?<h3 className="h6 text-success text-rab">  report:{observe.report}</h3>:<h3 className='h6 text-danger'>Report don't made</h3>}
{/* {observe.status?<><h3 className="h6">  Accept For Report:True</h3></>:<><h3 className="h6">  Accept For Report:False</h3></>} */}
<div className="d-flex justify-content-between">
  <span className="text-primary">Date: {observe.createdOn}</span>
  {/* <span>Accept For Report:{observe.status}</span> */}
</div>
<div className="button">
{/* <Link to={`/Acceptappointment/${observe.observationId}`}> */}
{observe.status?null:<>
  <div className='input-submit-r'>
<button  className='submit-btn-r' onClick={()=>acceptappoint(observe.observationId)}>Accept</button>
</div>
</>}

{/* {!observe.status?<>
  <div className='input-submit-r'>
<button  className='submit-btn-r' onClick={()=>rejectappoint(observe.observationId)}>reject</button>
</div>
</>:null} */}


{observe.status?<>
  <div className='input-submit-r'>
<Link to={`/Acceptappointment/${observe.observationId}`}>
<button  className='submit-btn-r'>Report</button></Link></div>
</>:null}



<div className='input-submit-r'>
<Link to={`/Editdiagnoses/${observe.observationId}`}>
<button  className='submit-btn-r'>Edit Diagnosis</button></Link></div>

<div className='input-submit-r'>
<button  className='submit-btn-r' onClick={()=>showfeedback(observe.observationId)}>Show Feedback</button>
</div>
{/* <Link to={`/Payment/${localStorage.getItem('observationId')}`}>
<button className='btn text-white bg-primary w-10'>Payment</button></Link> */}
</div>

{/* <button className='btn text-white bg-primary w-100 mb-2 mt-4' ></button> */}



{/* </Link> */}
      </div></>

      
      </div>
      )
      
    }</>}
  </div>
  
    </>
    </div>
  </>
}
