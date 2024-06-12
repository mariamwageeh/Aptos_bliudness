import React, { useState } from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';
import styles from './Login.css';

function AuthComponent({savedata}) {
    let nav=useNavigate();
    const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 
    try {
      const response = await axios.post('https://localhost:44389/api/Auth/Login', loginData);
      setLoading(false);
      console.log(response);
      if(response.data.status !== 400 ){
        console.log(response.data.token);
        localStorage.setItem('Token',response.data.token);
        savedata();
        if (localStorage.getItem('Role')==='Doctor'){
          nav('/Allappointment')
        }
        else if(localStorage.getItem('Role')==='User'){
        nav('/HomeP');}
        else{
          nav('/HomeAdmin')
        }
      
      }}

    catch (error) {
      setLoading(false);
      console.error('Login error:', error.response.data);
      alert(error.response.data)
      // Handle error (e.g., show error message)
    }
  };


  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };


  return (
    
<div className="login">
<div className='login-box'>
      <div className="login-header">
        <header>Login</header>
      </div>

      <form onSubmit={handleLoginSubmit}>
        <div className="input-box">
          <input
            className="input-field"
            type="email"
            value={loginData.email} onChange={handleLoginInputChange}
            name="email"
            placeholder='Email'
          />
        </div>
        <div className="input-box">
          <input
            className="input-field"
            type="password"
            value={loginData.password} onChange={handleLoginInputChange}
            name="password"
            placeholder='Password'
          />
        </div>


        {loading &&  <div className="text-center my-3">
        <div className="spinner-border text-primary " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          </div>}

        <div className="input-submit">
          <button type="submit" className='submit-btn' >Login</button>
        </div>
        <div className="sign-up-link">
          <p>Don't have account?  <Link className="a" to="/Register">Register</Link></p>
        </div>
        
      </form>
    </div>
    </div>
      );
    }
    
    export default AuthComponent;