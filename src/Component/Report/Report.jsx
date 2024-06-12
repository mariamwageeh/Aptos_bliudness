import React from 'react'
import styles from './Report.css';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Report() {
  const { observationId } = useParams();
  const token = localStorage.getItem('Token');
  const [registrationData, setRegistrationData] = useState({
    review: '',
    // This should be a file object
  });

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('review', registrationData.review);

    try {
      const response = await axios.put(
        `https://localhost:44389/api/Doctor/repot/${observationId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Handle the payment response
      console.log(response);
    } catch (error) {
      // Handle errors
      console.error('report error:', error);
      if (error.response && error.response.status === 400) {
        alert('Observation already Reviewed');
      }
    }
  };

  const handleRegistrationInputChange = (event) => {
    const { name, value } = event.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  return (
    <div className="login-r ch-margin">
    <div className="ch-ai">
      <div className="login-header-r">
        <header>Make a Report</header>
      </div>
      <form onSubmit={handleRegistrationSubmit}>
        <label htmlFor="review">review</label>
        <div className=" input-box-r-center">
        <textarea
          className="form-control mb-2"
          value={registrationData.review}
          onChange={handleRegistrationInputChange}
          name="review"
        ></textarea>
</div>
<div className="input-submit-r">
          <button type="submit" className='submit-btn-r' >Report</button>
        </div>
      </form>
    </div>
    </div>
  );
}
