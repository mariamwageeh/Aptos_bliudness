import React, { useState } from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';
function AuthComponent() {
    let nav=useNavigate();

  const [registrationData, setRegistrationData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    profileImg: null // This should be a file object
  });

  // const [loginData, setLoginData] = useState({
  //   email: '',
  //   password: ''
  // });

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('Username', registrationData.username);
    formData.append('Email', registrationData.email);
    formData.append('Password', registrationData.password);
    formData.append('FirstName', registrationData.firstName);
    formData.append('LastName', registrationData.lastName);
    formData.append('PhoneNumber', registrationData.phoneNumber);
    formData.append('ProfileImg', registrationData.profileImg);

    try {
      const response = await axios.post('https://localhost:44389/api/Admin/AddDoctor', formData);
          if(response.data.status !== 400){
        nav('/Login');
    }
      console.log(response.data);
      // Handle success (e.g., show success message)
    } catch (error) {
      console.error('Registration error:', error.response.data);
      alert(error.response.data)
      // Handle error (e.g., show error message)
    }
  };

  // const handleLoginSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post('/api/Auth/Login', loginData);
  //     console.log(response.data);
  //     // Handle success (e.g., store token in local storage)
  //   } catch (error) {
  //     console.error('Login error:', error.response.data);
  //     // Handle error (e.g., show error message)
  //   }
  // };

  const handleRegistrationInputChange = (event) => {
    const { name, value } = event.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  // const handleLoginInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setLoginData({ ...loginData, [name]: value });
  // };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setRegistrationData({ ...registrationData, profileImg: file });
  };

  return (
    <div className="w-75 mx-auto py-4 parent update mb-100">
      <h2>Registration</h2>
      <form onSubmit={handleRegistrationSubmit}>
      <label htmlFor="firstName">First Name</label>
       <input
          className="form-control mb-2"
          type="text"
          value={registrationData.firstName} onChange={handleRegistrationInputChange}
          name="firstName"
        />

<label htmlFor="lastname">LastName</label>
       <input
          className="form-control mb-2"
          type="text"
          value={registrationData.lastName} onChange={handleRegistrationInputChange}
          name="lastName"
        />


<label htmlFor="username">user name</label>
       <input
          className="form-control mb-2"
          type="text"
          value={registrationData.username} onChange={handleRegistrationInputChange}
          name="username"
        />


<label htmlFor="email">email</label>
       <input
          className="form-control mb-2"
          type="email"
          value={registrationData.email} onChange={handleRegistrationInputChange}
          name="email"
        />

<label htmlFor="phoneNumber">phone Number</label>
       <input
          className="form-control mb-2"
          type="tel"
          value={registrationData.phoneNumber} onChange={handleRegistrationInputChange}
          name="phoneNumber"
        />

<label htmlFor="password">password</label>
       <input
          className="form-control mb-2"
          type="password"
          value={registrationData.password} onChange={handleRegistrationInputChange}
          name="password"
        />



<label htmlFor="profileImg">profileImg</label>
       <input
          className="form-control mb-2"
          type="file"
         onChange={handleFileInputChange}
          name="profileImg"
        />

<button type="submit" className="btn btn-primary text-white">Register</button>
        {/* <input type="text" name="username" placeholder="Username" value={registrationData.username} onChange={handleRegistrationInputChange} required />
        <input type="email" name="email" placeholder="Email" value={registrationData.email} onChange={handleRegistrationInputChange} required />
        <input type="password" name="password" placeholder="Password" value={registrationData.password} onChange={handleRegistrationInputChange} required />
        <input type="text" name="firstName" placeholder="First Name" value={registrationData.firstName} onChange={handleRegistrationInputChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={registrationData.lastName} onChange={handleRegistrationInputChange} required />
        <input type="tel" name="phoneNumber" placeholder="Phone Number" value={registrationData.phoneNumber} onChange={handleRegistrationInputChange} required />
        <input type="file" name="profileImg" onChange={handleFileInputChange}  />
        <button type="submit">Register</button> */}
      </form>

      {/* <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginInputChange} required />
        <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginInputChange} required />
        <button type="submit">Login</button>
      </form> */}
    </div>
  );
}

export default AuthComponent;


