import React, { useEffect } from 'react'
import styles from './HistoryD.css';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function HistoryD() {

const[history,sethistory]=useState([]);
  const [load,setload]=useState(false)
    async function gethistory(){
      setload(true)
      const token= localStorage.getItem('Token');
     const id=localStorage.getItem('Userid')
   

      let {data}= await axios.get( `https://localhost:44389/api/Doctor/History/${id}`, { headers: { Authorization: `Bearer ${token}` } });
     sethistory(data)
     setload(false)
    console.log(data)
    
    }
   

  useEffect(()=>{
  gethistory();
  },[])

  async function  getdel(id){
    // try{
    // setload(true)
    const token= localStorage.getItem('Token');
  //  const observationId=localStorage.getItem('observationId');

    // let {data}= await axios.put(`https://localhost:44389/api/Patient/Delete/${observationId}`,
    //  { headers: { Authorization: `Bearer ${ localStorage.getItem('Token')}` } });
    const response = await axios.delete(
      `https://localhost:44389/api/Doctor/DeleteHistory/${id}`, [],// Update the URL here
     
      { headers: { Authorization: `Bearer ${token}` } }
    );
    gethistory();
  //  setdel(data)
  //  setload(false)
  // console.log(data)
// }catch(error){
//   console.error('Update error:', error.data);
// }
  
  }

  return <>


<div className="login-r-p">
    <div className="login-header-r">
        <header>History</header>
    </div>
  


<>
  <div className="row">
  {load?<div className='text-center'><i className='fas fa-spin fa-spinner fa-3x text-primary'></i></div>:<>
    {
      history.map((history)=> <div key={history.historyId} className='col-md-2 login-box-r-phd '>
  
      <div className=' px-2 py-3 '>
      {/* <Link to={`/ProDetails/${history.historytorId}`}> */}
      {/* <img className='w-100' src={`data:image/png;base64,${history.profileImg}`} alt='err'/> */}
        <span className='fw-bold '>doctor name:{history.doctorName}</span>
        <h3 className='h6'>Patient Name:{history.patientName.split(' ').slice(0,2).join(' ')}</h3>
<h3 className="h6">  diagnosis:  {history.diagnosis}</h3>
{history.review===null?<h3 className="h6">  review: Not Found</h3>:null}
{/* <h3 className="h6">isDeleted:{history.isDeleted}</h3> */}
{history.paymentStatus===1?<h3 className="h6">payment:Pay done</h3>
:null}

<div className="d-flex justify-content-between">
  <span className="text-primary">createdOn: {history.createdOn}</span>
 
</div>
{/* <div className="button b">
<button onClick={()=>getdel(history.historyId)} className='btn text-white w-40 ms-auto ml-5'><i className="fa-solid fa-trash"></i></button>
</div> */}
{/* <Link to={`/Feedback/${localStorage.getItem('observationId')}`}>
<button className='btn text-white bg-primary w-40 me-auto '>feedback</button></Link>
<Link to={`/Payment/${localStorage.getItem('observationId')}`}>
<button className='btn text-white bg-primary w-10'>Payment</button></Link>
<hr></hr> */}
{/* <button className='btn text-white bg-primary w-100 mb-2 mt-4' ></button> */}

<div className='input-submit-r'>
<button onClick={()=>getdel(history.historyId)} className='submit-btn-r'><i className="fa-solid fa-trash"></i></button>
</div>

{/* </Link> */}
      </div>
      </div>
      )
    }</>}
  </div>
    </>


</div>
  
  </>
}
