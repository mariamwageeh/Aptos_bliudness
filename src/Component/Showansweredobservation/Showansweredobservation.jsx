// import React from 'react'
// import styles from './Showansweredobservation.css';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// export default function Showansweredobservation() {
//   const[observe,setobserve]=useState([]);
//   const [load,setload]=useState(false)
//     async function getobserve(){
//       setload(true)
//       const token= localStorage.getItem('Token');
//      const id=localStorage.getItem('Userid')
   

//       let {data}= await axios.get(`https://localhost:44389/api/Patient/ShowObservationsByPatient/${id}`, { headers: { Authorization: `Bearer ${token}` } });
//      setobserve(data)
//      setload(false)
//    console.log(data)
    
//     }
   

//   useEffect(()=>{
//   getobserve();
//   },[])

// //   const handleDeleteUser = () => {
// //     // Update the state to set isDeleted to true
// //     setobserve(prevData => ({
// //         ...prevData,
// //         isDeleted: true,
// //     }));
// // };

// //   async function Showobserve(){
// //     // setload(true)
// //     const token= localStorage.getItem('Token');
// //     let id=localStorage.getItem('Userid')
  
// //     let {data}= await axios.get(`https://localhost:44389/api/Patient/ShowObservationsByPatient/${id}`, { headers: { Authorization: `Bearer ${token}` } });
// //   //  setobserve(data.data)
// //   //  setload(false)
// //   console.log(data)
// //   }

// // useEffect(()=>{
// // Showobserve();
// // },[])


 
// async function getdel(id) {
//   try {
//     const token = localStorage.getItem('Token');
//     const response = await axios.delete(
//       `https://localhost:44389/api/Patient/DeleteObservation/${id}`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     localStorage.removeItem('report');
//     alert('Observation deleted successfully');
//     console.log(response.data);
//     getobserve();
//   } catch (error) {
//     console.error('Delete observation error:', error);
//     if (error.response && error.response.status === 400) {
//       alert(error.response.data);
//     } else {
//       alert('An error occurred while deleting the observation.');
//     }
//   }
// }

   
    
//   // useEffect(()=>{
//   // getdel();
//   // },[])
//   async function pay(id) {
//     const token = localStorage.getItem('Token');
    
//     try {
//       const response = await axios.post(
//         `https://localhost:44389/api/patient/createpayment/${id}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
  
//       // Open the payment URL in response.data in a new tab
//       window.open(response.data, '_blank');
      
//       console.log(response);
      
//     } catch (error) {
//       // Handle errors
//       console.error('report error:', error);
//       if (error.response && error.response.status === 400) {
//        alert('error done')
//       }
//       else
//       {
//         alert('Payment Done Succsfully')
//       }
//     }
//   }
  

//   return <>
//  <>
//  <div className="login-r-p">
//     <div className="login-header-r">
//         <header>Answer Observation</header>
//     </div>
//   <div className="row ">
//   {load?<div className='text-center'><i className='fas fa-spin fa-spinner fa-3x text-primary'></i></div>:<>
//     {
//       observe.map((observe)=> <div key={observe.observationId} className='col-md-2 login-box-r-ps'>
  
//       <div className=' px-2 py-3 '>
//       {/* <Link to={`/ProDetails/${observe.observetorId}`}> */}
//       <img className='w-100' src={`data:image/png;base64,${observe.medicalRedation}`} alt='err'/>
     
//         <span className='fw-bold '>doctor name:{observe.doctorName}</span>
//         <h3 className='h6'>Patient Name:{observe.patientName.split(' ').slice(0,2).join(' ')}</h3>
// <h3 className="h6">  diagnosis:  {observe.diagnosis}/5</h3>
// <h3 className="h6 text-primary text-rab"> Your Feedback:  {observe.feedback} </h3>
//   <h3 className=" h6">Created On: {observe.createdOn}</h3>
//   {/* <span><i className='fa fa-star'></i>{observe.ratingsAverage}</span> */}
//  <div className="button">
//  <div className='input-submit-r'>
// {/* <Link to={`/Deleteobserve/${observe.observationId}`}> */}
// <button onClick={()=>{getdel(observe.observationId);}} className='submit-btn-r '>Delete Observation</button>
// </div>
// <div className='input-submit-r'>
// <Link to={`/Feedback/${observe.observationId}`} className='link'>
// <button className='submit-btn-r '>feedback</button></Link></div>


// {!observe.paymentStatus?<><div className='input-submit-r'>

// <button className='submit-btn-r 'onClick={()=>{pay(observe.observationId);}}>Payment</button></div> </>:null}



// <div className='input-submit-r'>
// <Link to={`/ShowReport/${observe.observationId}`} className='link'>
// <button className='submit-btn-r'>show Report</button></Link></div>
// </div>
//       </div>
//       </div>
//       )
//     }</>}
//   </div>
//   </div>
//     </>


  
//   </>
// }



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Showansweredobservation.css';

export default function Showansweredobservation() {
  const [observe, setObserve] = useState([]);
  const [load, setLoad] = useState(false);

  async function getObserve() {
    setLoad(true);
    const token = localStorage.getItem('Token');
    const id = localStorage.getItem('Userid');

    try {
      const { data } = await axios.get(
        `https://localhost:44389/api/Patient/ShowObservationsByPatient/${id}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(data)
      setObserve(data);
      setLoad(false);
    } catch (error) {
      console.error('Error fetching observations:', error);
      setLoad(false);
    }
  }

  useEffect(() => {
    getObserve();
  }, []);

  async function handleDelete(id) {
    try {
      const token = localStorage.getItem('Token');
      await axios.delete(
        `https://localhost:44389/api/Patient/DeleteObservation/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Observation deleted successfully');
      // Remove the deleted observation from the local state
      setObserve(prevObserve => prevObserve.filter(observation => observation.observationId !== id));
    } catch (error) {
      console.error('Delete observation error:', error);
      alert('An error occurred while deleting the observation.');
    }
  }

  async function handlePayment(id) {
    const token = localStorage.getItem('Token');

    try {
      const response = await axios.post(
        `https://localhost:44389/api/patient/createpayment/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      window.open(response.data, '_blank');
      
      // Update paymentStatus locally
      setObserve(prevObserve =>
        prevObserve.map(observation =>
          observation.observationId === id
            ? { ...observation, paymentStatus: true }
            : observation
        )
      );
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred while processing the payment.');
    }
  }

  return (
    <div className="login-r-p">
      <div className="login-header-r">
        <header>Answer Observation</header>
      </div>
      <div className="row">
        {load ? (
          <div className='text-center'>
            <i className='fas fa-spin fa-spinner fa-3x text-primary'></i>
          </div>
        ) : (
          observe.map((observation) => (
            <div key={observation.observationId} className='col-md-2 login-box-r-ps'>
              <div className='px-2 py-3'>
                <img className='w-100' src={`data:image/png;base64,${observation.medicalRedation}`} alt='Observation' />
                <span className='fw-bold'>Doctor Name: {observation.doctorName}</span>
                <h3 className='h6'>Patient Name: {observation.patientName.split(' ').slice(0, 2).join(' ')}</h3>
                <h3 className="h6">Diagnosis: {observation.diagnosis}/4</h3>
                {observation.feedback?<h3 className="h6 text-primary text-rab">Your Feedback: {observation.feedback}</h3>:null}
                
                <h3 className="h6">Created On: {observation.createdOn}</h3>
                <div className="button">
                  <div className='input-submit-r'>
                    <button onClick={() => handleDelete(observation.observationId)} className='submit-btn-r'>
                      Delete Observation
                    </button>
                  </div>
                  <div className='input-submit-r'>
                    <Link to={`/Feedback/${observation.observationId}`} className='link'>
                      <button className='submit-btn-r'>Feedback</button>
                    </Link>
                  </div>
                  {!observation.paymentStatus && (
                    <div className='input-submit-r'>
                      <button onClick={() => handlePayment(observation.observationId)} className='submit-btn-r'>
                        Payment
                      </button>
                    </div>
                  )}
                  <div className='input-submit-r'>
                    <Link to={`/ShowReport/${observation.observationId}`} className='link'>
                      <button className='submit-btn-r'>Show Report</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
