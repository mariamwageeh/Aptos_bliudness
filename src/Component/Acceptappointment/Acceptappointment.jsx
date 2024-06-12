import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Acceptappointment.css';
// import Allappointment from '../Allappointment/Allappointment';
import App from './../../App';
import Allappointment from './../Allappointment/Allappointment';
export default function Review() {
  const token = localStorage.getItem('Token');
  const { observationId } = useParams();

  const [reviewData, setReviewData] = useState({
    report: '',
  });
  const nav = useNavigate();
  let response;
  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('report', reviewData.report);

    try {
        response = await axios.put(
        `https://localhost:44389/api/Doctor/repot/${observationId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response.data);
     
   
  
// console.log(report);
{/* <App report={report}/> */}

      localStorage.setItem('report',response.data.report)
      alert('Review submitted successfully');
      nav('/Allappointment');
    } catch (error) {
      console.error('Review error:', error);
      alert(error.response?.data || 'REview aleardy done before');
      nav('/Allappointment');
    }
  };

  const handleReviewInputChange = (event) => {
    const { name, value } = event.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  return (
    <div className="login-r ch-margin">
    <div className="ch-ai">
      <div className="login-header-r">
        <header>Make Review </header>
      </div>

      <form onSubmit={handleReviewSubmit}>
      <div className=" input-box-r-center">
      <div className="input-box-r">
        <textarea
          className="input-field-r"
          type="text"
          value={reviewData.Review}
          onChange={handleReviewInputChange}
          name="report"
        /></div>
        {/* <div><Allappointment report={reviewData.Review} /></div> */}
        </div>
               <div className="input-submit-r">
          <button type="submit" className='submit-btn-r' >Review</button>
        </div>
      </form>
    </div>
    {/* <Allappointment report={response.data.report}/> */}
    </div>
  );
}
