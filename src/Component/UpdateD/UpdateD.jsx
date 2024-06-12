import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './UpdateD.module.css';

export default function UpdateD() {
  const navigate = useNavigate();
  const token = localStorage.getItem('Token');
  const id = localStorage.getItem('Userid');
  const [doc, setDoc] = useState({});
  const [registrationData, setRegistrationData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    careerInfo: '',
    profileImg: null
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function getDoc() {
    try {
      let { data } = await axios.get(`https://localhost:44389/api/doctor/ShowProfile/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDoc(data);
      setRegistrationData({
        username: data.username || '',
        email: data.email || '',
        password: '',
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        phoneNumber: data.phoneNumber || '',
        careerInfo: data.careerInfo,
        profileImg: data.profileImg
      });
    } catch (error) {
      console.error('Report error:', error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errors?.Password || 'You are not registered or login again');
      }
    }
  }

  useEffect(() => {
    getDoc();
  }, []);

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('Username', registrationData.username);
    formData.append('Email', registrationData.email);
    formData.append('Password', registrationData.password);
    formData.append('FirstName', registrationData.firstName);
    formData.append('LastName', registrationData.lastName);
    formData.append('PhoneNumber', registrationData.phoneNumber);
    formData.append('careerInfo', registrationData.careerInfo);

    function base64ToBlob(base64, contentType) {
      const byteCharacters = atob(base64);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      return new Blob(byteArrays, { type: contentType });
    }

    if (registrationData.profileImg && typeof registrationData.profileImg === 'string') {
      const contentType = 'image/jpeg'; // adjust based on the actual content type
      const base64String = registrationData.profileImg.replace(/^data:image\/(png|jpeg);base64,/, '');
      const imageBlob = base64ToBlob(base64String, contentType);
      formData.append('ProfileImg', imageBlob, 'profileImg.jpg');
    } else if (registrationData.profileImg) {
      formData.append('ProfileImg', registrationData.profileImg);
    }

    try {
      const response = await axios.put(
        `https://localhost:44389/api/doctor/updatedoctorinfo/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoading(false);
      console.log(response.data);
      if (registrationData.profileImg) {
        localStorage.setItem('photo', response.data.profileImg);
      }
      navigate('/ProfileD');
    } catch (error) {
      setLoading(false);
      console.error('Update error:', error);
      setErrorMessage(error.response.data.errors?.Password || 'An error occurred during the update.');
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
      <div className="login-box-upd">
        <div className="login-header-r">
          <header>Update</header>
        </div>
        <form onSubmit={handleRegistrationSubmit}>
          <div className="input-box-r">
            <input
              className="input-field-r"
              type="text"
              value={registrationData.firstName}
              onChange={handleRegistrationInputChange}
              name="firstName"
              placeholder="First Name"
            />
          </div>
          <div className="input-box-r">
            <input
              className="input-field-r"
              type="text"
              value={registrationData.lastName}
              onChange={handleRegistrationInputChange}
              name="lastName"
              placeholder="Last Name"
            />
          </div>
          <div className="input-box-r">
            <input
              className="input-field-r"
              type="text"
              value={registrationData.username}
              onChange={handleRegistrationInputChange}
              name="username"
              placeholder="User Name"
            />
          </div>
          <div className="input-box-r">
            <input
              className="input-field-r"
              type="email"
              value={registrationData.email}
              onChange={handleRegistrationInputChange}
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="input-box-r">
            <input
              className="input-field-r"
              type="tel"
              value={registrationData.phoneNumber}
              onChange={handleRegistrationInputChange}
              name="phoneNumber"
              placeholder="Phone Number"
            />
          </div>
          <div className="input-box-r">
            <input
              className="input-field-r"
              type="password"
              value={registrationData.password}
              onChange={handleRegistrationInputChange}
              name="password"
              placeholder="Password"
            />
          </div>

          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}
          <div className="input-box-r">
            <input
              className="input-field-r"
              type="text"
              value={registrationData.careerInfo}
              onChange={handleRegistrationInputChange}
              name="careerInfo"
              placeholder="Career Info"
            />
          </div>
          <div className="input-box-r-center">
            <input
              className="input-field-r file-handle"
              type="file"
              onChange={handleFileInputChange}
              name="profileImg"
              placeholder="Profile Image"
            />
          </div>
          {loading && (
            <div className="text-center my-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
         
          <div className="input-submit-r">
            <button type="submit" className="submit-btn-r">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
