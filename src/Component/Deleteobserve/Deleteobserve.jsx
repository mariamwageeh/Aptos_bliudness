import React from 'react'
import styles from './Deleteobserve.css';
import axios from 'axios';
import { useState,useEffect } from 'react';
export default function Deleteobserve() {

  // const[del,setdel]=useState([]);
  // const [load,setload]=useState(false)
  //   async function getdel(){
  //     try{
  //     setload(true)
  //     const token= localStorage.getItem('Token');
  //    const observationId=localStorage.getItem('observationId');

  //     let {data}= await axios.put(`https://localhost:44389/api/Patient/Delete/${observationId}`, { headers: { Authorization: `Bearer ${token}` } });
  //    setdel(data)
  //    setload(false)
  //   console.log(data)
  // }catch(error){
  //   console.error('Update error:', error.data);
  // }
    
  //   }
   

  // useEffect(()=>{
  // getdel();
  // },[])

  return <>
  <h2 className='del'>Delete Done</h2>
  
  </>
}
