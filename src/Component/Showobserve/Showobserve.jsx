import React from 'react'
import styles from './Showobserve.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Showobserve() {
// console.log(props.del)
  const[observe,setobserve]=useState([]);
  const [load,setload]=useState(false)
    async function getobserve(){
      setload(true)
      const token= localStorage.getItem('Token');
     const id=localStorage.getItem('Userid')
   

      let {data}= await axios.get(`https://localhost:44389/api/Patient/ShowRequestedObservationsByPatient/${id}`, { headers: { Authorization: `Bearer ${token}` } });
     setobserve(data)
     setload(false)
    console.log(data)
 
    
    }
   

  useEffect(()=>{
  getobserve();
  },[])

//   const handleDeleteUser = () => {
//     // Update the state to set isDeleted to true
//     setobserve(prevData => ({
//         ...prevData,
//         isDeleted: true,
//     }));
// };

//   async function Showobserve(){
//     // setload(true)
//     const token= localStorage.getItem('Token');
//     let id=localStorage.getItem('Userid')
  
//     let {data}= await axios.get(`https://localhost:44389/api/Patient/ShowObservationsByPatient/${id}`, { headers: { Authorization: `Bearer ${token}` } });
//   //  setobserve(data.data)
//   //  setload(false)
//   console.log(data)
//   }

// useEffect(()=>{
// Showobserve();
// },[])


 
async function  getdel(id){
      // try{
      // setload(true)
      const token= localStorage.getItem('Token');
    //  const observationId=localStorage.getItem('observationId');

      // let {data}= await axios.put(`https://localhost:44389/api/Patient/Delete/${observationId}`,
      //  { headers: { Authorization: `Bearer ${ localStorage.getItem('Token')}` } });
      const response = await axios.delete(
        `https://localhost:44389/api/Patient/DeleteObservation/${id}`, [],// Update the URL here
       
        { headers: { Authorization: `Bearer ${token}` } }
      );
      getobserve();
     alert('delete done')
        // localStorage.removeItem('photo');
  console.log(response);
    //  setdel(data)
    //  setload(false)
    // console.log(data)
  // }catch(error){
  //   console.error('Update error:', error.data);
  // }
    
    }
   
    
  // useEffect(()=>{
  // getdel();
  // },[])


  return <>
 <>
 <div className="login-r-p">
    <div className="login-header-r">
        <header>Observation</header>
    </div>
  <div className="row">
  {load?<div className='text-center'><i className='fas fa-spin fa-spinner fa-3x text-primary'></i></div>:<>
    {
      observe.map((observe)=> <div key={observe.observationId} className='col-md-2 login-box-r-pso'>
  
      <div className='px-2 py-3 '>
      {/* <Link to={`/ProDetails/${observe.observetorId}`}> */}
      <img className='w-100' src={`data:image/png;base64,${observe.medicalRedation}`} alt='err'/>
     
        <span className='fw-bold '>doctor name:{observe.doctorName}</span>
        <h3 className='h6'>Patient Name:{observe.patientName.split(' ').slice(0,2).join(' ')}</h3>
<h3 className="h6">  diagnosis:  {observe.diagnosis}/4</h3>

 
<div className="button">
<div className='input-submit-r'>
{/* <Link to={`/Deleteobserve/${localStorage.getItem('observationId')}`} className='link'> */}
<button onClick={()=>getdel(observe.observationId)} className='submit-btn-r'>Delete Observation</button>
</div>
{/* <div className='input-submit-r'>
<Link to={`/Feedback/${observe.observationId}`} className='link'>
<button className='submit-btn-r '>feedback</button></Link></div> */}
{/* <div className='input-submit-r'>
<Link to={`/Payment/${observe.observationId}`} className='link'>
<button className='submit-btn-r '>Payment</button></Link>
</div> */}
</div>
      </div>
      </div>
      )
    }</>}
  </div>
  </div>
    </>


  
  </>
}
