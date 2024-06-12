import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams ,useNavigate} from 'react-router-dom';

export default function Feedback() {
  const token = localStorage.getItem('Token');
 let {observationId } = useParams();
 console.log(observationId)
  const [registrationData, setRegistrationData] = useState({
    Feedback: '',
  });
let nav=useNavigate();
  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    const formData = new URLSearchParams();
    formData.append('Feedback', registrationData.Feedback);

    try {
      const response = await axios.put(
        `https://localhost:44389/api/Patient/Feedback/${observationId}`,
        formData.toString(), // Convert formData to URL-encoded string
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      console.log(response.data);
      alert('feedback done')
nav('/Showansweredobservation');
    } catch (error) {
      console.error('Feedback error:', error);
      alert(error.response.data);
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
        <header>Feedback</header>
      </div>

      <form onSubmit={handleRegistrationSubmit}>
      <div className="input-box-r">
        <textarea
          className="input-field-r "
          type="text"
          value={registrationData.Feedback}
          onChange={handleRegistrationInputChange}
          name="Feedback"
        ></textarea></div>
        <div className="input-submit-r">
          <button type="submit" className='submit-btn-r' >Feedback</button>
        </div>
      </form>
    </div>
    </div>
  );
}
