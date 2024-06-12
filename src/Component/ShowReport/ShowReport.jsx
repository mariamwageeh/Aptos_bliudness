import React from 'react'
import styles from './ShowReport.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ShowReport() {
  const[observe,setobserve]=useState([]);
  const [load,setload]=useState(false);
  let nav=useNavigate();
  const { observationId } = useParams();
    async function getobserve(){
      setload(true)
      const token= localStorage.getItem('Token');
    
try{
      let {data}= await axios.get(`https://localhost:44389/api/Patient/ShowReport/${observationId}`, { headers: { Authorization: `Bearer ${token}` } });
     setobserve(data)
     setload(false)
    console.log(data)

  }
    catch(error){
     
        alert(error.response.data);
        nav('/Showansweredobservation');
    }
    
    }
   

  useEffect(()=>{
  getobserve();
  })
  return <>
 
  <div className="login-r ch-margin">
    <div className="ch-ai">
      <div className="login-header-r ">
        <div className="h">
        <header>Doctor Report</header></div>
      </div>
      <h2 className='name-doc d text-rab'>{observe}</h2>
 
    </div>
    </div>
  </>
}
