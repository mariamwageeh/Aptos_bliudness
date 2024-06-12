import React from 'react'
import styles from './HomeP.css';
import axios from  "axios";
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
export default function HomeP() {
  

  const[doc,setdoc]=useState([]);
  const [load,setload]=useState(false)
    async function getdoc(){
      setload(true)
      const token= localStorage.getItem('Token');
     try{
      let {data}= await axios.get(`https://localhost:44389/api/Patient/GetAllDoctors`,  { headers: { Authorization: `Bearer ${token}` } });
     setdoc(data)
     setload(false)
    console.log(data)}
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

  const handleButtonClick = (userId) => {
    console.log('Clicked user ID:', userId);
    localStorage.setItem('docid',userId)

  };
  
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
            <div className='input-submit-r'>
            <Link to={`/Askonlineobserve/${localStorage.getItem('Userid')}`} className='link' >
            <button className='submit-btn-r' onClick={() => handleButtonClick(doc.userId)}>Ask online observation</button></Link>
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
