import React from 'react'
import styles from './Getallpatientbyadmin.module.css';
import axios from 'axios';
import { useState,useEffect } from 'react';
export default function Getallpatientbyadmin() {
  const[observe,setobserve]=useState([]);
  const [load,setload]=useState(false)
    async function getobserve(){
      setload(true)
      const token= localStorage.getItem('Token');
    //  const id=localStorage.getItem('Userid')
   

      let {data}= await axios.get(`https://localhost:44389/api/Admin/GetAllPatientsByAdmin`, { headers: { Authorization: `Bearer ${token}` } });
     setobserve(data)
     setload(false)
    console.log(data)
    
    }
   

  useEffect(()=>{
  getobserve();
  },[])



  async function  getdel(id){
    // try{
    // setload(true)
    const token= localStorage.getItem('Token');
  //  const observationId=localStorage.getItem('observationId');

    // let {data}= await axios.put(`https://localhost:44389/api/Patient/Delete/${observationId}`,
    //  { headers: { Authorization: `Bearer ${ localStorage.getItem('Token')}` } });
    const response = await axios.delete(
      `https://localhost:44389/api/Admin/DeleteUser/${id}`,// Update the URL here
     
      { headers: { Authorization: `Bearer ${token}` } }
    );
 
  //  setdel(data)
  //  setload(false)
  // console.log(data)
// }catch(error){
//   console.error('Update error:', error.data);
// }
  
  }


  return <>
 <>
  <div className="row">
  {load?<div className='text-center'><i className='fas fa-spin fa-spinner fa-3x text-primary'></i></div>:<>
    {
      observe.map((observe)=> <div key={observe.userId} className='col-md-2'>
           <img className='w-100' src={`data:image/png;base64,${observe.profileImg}`} alt='err'/>
<div className='observe px-2 py-3 '>
      {/* <Link to={`/ProDetails/${observe.observetorId}`}> */}
      {/* <img className='w-100' src={`data:image/png;base64,${observe.profileImg}`} alt='err'/> */}
        <span className='fw-bold '>name:{observe.firstName}</span>
        <h3 className='h6'>user Id:{observe.patientId}</h3>
  {/* <span>Accept For Report:{observe.status}</span> */}
</div>



<button onClick={()=>getdel(observe.userId)} className='btn text-white bg-primary w-100  mb-2 '>Delete user</button>



{/* </Link> */}
    

      
      </div>
      )
    }</>}
  </div>
    </>
  
  </>
}
