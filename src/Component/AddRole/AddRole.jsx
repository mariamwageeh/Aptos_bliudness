import React, { useState } from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';
import styles from './AddRole.css'

export default function AddRole() {
  let nav=useNavigate();
  const [loading, setLoading] = useState(false);

  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    profileImg: null
  });


  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('Username', registrationData.username);
    formData.append('Email', registrationData.email);
    formData.append('Password', registrationData.password);
    formData.append('FirstName', registrationData.firstName);
    formData.append('LastName', registrationData.lastName);
    formData.append('PhoneNumber', registrationData.phoneNumber);
    formData.append('ProfileImg', registrationData.profileImg);

    try {
      const token= localStorage.getItem('Token');
      const response = await axios.post('https://localhost:44389/api/Admin/AddAdmin', formData, { headers: { Authorization: `Bearer ${token}` } });
      setLoading(false);
      if(response.data.status !== 400){
    }
      console.log(response.data);
      nav('/HomeAdmin')
    } catch (error) {
      setLoading(false);
      console.error('Registration error:', error.response.data);
      alert(error.response.data);
    }
  };

  const handleRegistrationInputChange = (event) => {
    const { name, value } = event.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setRegistrationData({ ...registrationData, profileImg: file });
  };

  return (
    <div className="login-r">
    <div className="login-box-rA">
      <div className="login-header-r">
        <header>Add Admin</header>
      </div>

      <form onSubmit={handleRegistrationSubmit}>
      <div className="input-box-r">
      <input
          className="input-field-r"
          type="text"
          value={registrationData.firstName} onChange={handleRegistrationInputChange}
          name="firstName"
          placeholder='First Name'
        />
        </div>
        <div className="input-box-r">
        <input
          className="input-field-r"
          type="text"
          value={registrationData.lastName} onChange={handleRegistrationInputChange}
          name="lastName"
          placeholder='Last Name'
        />
        </div>
        <div className="input-box-r">
        <input
          className="input-field-r"
          type="text"
          value={registrationData.username} onChange={handleRegistrationInputChange}
          name="username"
          placeholder='User Name'
        />
        </div>
        <div className="input-box-r">
        <input
          className="input-field-r"
          type="email"
          value={registrationData.email} onChange={handleRegistrationInputChange}
          name="email"
          placeholder='Email'
        />
        </div>
        <div className="input-box-r">
        <input
          className="input-field-r"
          type="tel"
          value={registrationData.phoneNumber} onChange={handleRegistrationInputChange}
          name="phoneNumber"
          placeholder='Phone Number'
        />
        </div>
        <div className="input-box-r">
        <input
          className="input-field-r"
          type="password"
          value={registrationData.password} onChange={handleRegistrationInputChange}
          name="password"
          placeholder='Password'
        />
        </div>




        <div className=" input-box-r-center">
        <input
          className="input-field-r file-handle"
          type="file"
         onChange={handleFileInputChange}
          name="profileImg"
          placeholder='Profile Image'
        />
        </div>

        {loading && <div className="text-center my-3">
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div></div>}

        <div className="input-submit-r">
          <button type="submit" className='submit-btn-r' >Add</button>
        </div>
       

   
      </form>

      
    </div>
    </div>
  );
}
