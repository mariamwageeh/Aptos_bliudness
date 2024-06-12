import React, { useState } from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';
import styles from './UploadImg.css';

function AuthComponent() {
    let nav=useNavigate();

  const [registrationData, setRegistrationData] = useState({
 
    file: null // This should be a file object
  });

 
  const [load,setload]=useState(false);
  const[data,setdata]=useState(null)
  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('file', registrationData.file);

    try {
      setload(true)
      const response = await axios.post('https://localhost:44389/FlaskConsumer/Predict', formData);
   
    setdata(response.data)
      console.log(response.data);
      // Handle success (e.g., show success message)
      setload(false)
    } catch (error) {
      console.error('Registration error:', error.response.data);
      setload(false)
      // Handle error (e.g., show error message)
    }
  };



  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setRegistrationData({ ...registrationData, file: file });
  };

  return (
    <div className="login-r ch-margin">
    <div className="ch-ai">
      <div className="login-header-r">
        <header>Check whit AI</header>
      </div>

      <form onSubmit={handleRegistrationSubmit}>
      

        <div className=" input-box-r-center">
        <input
          className="input-field-r file-handle"
          type="file"
         onChange={handleFileInputChange}
          name="file"
        />
        </div>

        {load && (
          <div className="text-center my-3">
            <div className="spinner-border text-primary " role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <h2 className='text-center'>It's {data}from 4 dagree</h2>

        <div className="input-submit-r">
          <button type="submit" className='submit-btn-r' >Check</button>
        </div>
   
      </form>

      
    </div>
    </div>
  );
}

export default AuthComponent;













