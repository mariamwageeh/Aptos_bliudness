import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Editdiagnoses.css'; // Assuming you have CSS file
// Adjust the import statement based on the actual location

export default function Report() {
  const { observationId } = useParams();
  const token = localStorage.getItem('Token');
  const [registrationData, setRegistrationData] = useState({
    Doctordiagnosis: '',
  });
  const nav = useNavigate();

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    const formData = new URLSearchParams();
    formData.append('Doctordiagnosis', registrationData.Doctordiagnosis);

    try {
      const response = await axios.put(
        `https://localhost:44389/api/doctor/updatediagnosis/${observationId}`,
        formData.toString(),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      nav('/Allappointment');
      // Handle the payment response
      console.log(response);
    } catch (error) {
      // Handle errors
      console.error('report error:', error);
      if (error.response && error.response.status === 400) {
        alert('Error done ');
      }
    }
  };

  const handleRegistrationInputChange = (event) => {
    const { name, value } = event.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  return (
    <div className="login-r ch-margin">
      <div className="ch-ai-d">
        <div className="login-header-r">
          <header>Update Diagnosis</header>
        </div>
        <form onSubmit={handleRegistrationSubmit}>
          {/* <label >Doctordiagnosis</label> */}
          <div className="input-box-r-center">
          {
  [0, 1, 2, 3, 4].map((value, index) => (
    <div key={index} className='input-radio'>
      <input
        type="radio"
        className='radio'
        id={`Doctordiagnosis${index}`}
        name="Doctordiagnosis"
        value={value}
        checked={registrationData.Doctordiagnosis === `${value}`}
        onChange={handleRegistrationInputChange}
      />
      <label className={`lable-d lable-d${index}`} htmlFor={`Doctordiagnosis${index}`}>{value}/4</label>
      <br />
    </div>
  ))
}
</div>

          <div className="input-submit-r">
            <button type="submit" className='submit-btn-r'>Edit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
