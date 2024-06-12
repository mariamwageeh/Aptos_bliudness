import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Askonlineobserve.css';

function AuthComponent() {
    let nav = useNavigate();
    const [user, setUser] = useState([]);
    const [registrationData, setRegistrationData] = useState({
        DoctorId: localStorage.getItem('docid'),
        Gender: '',
        Age: '',
        MedicalRecord: '',
        MedicalRedation: null
    });

    const token = localStorage.getItem('Token');
    const [load, setLoad] = useState(false);

    const handleRegistrationSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('DId', registrationData.DoctorId);
        formData.append('Gender', registrationData.Gender);
        formData.append('Age', registrationData.Age);
        formData.append('MedicalRecord', registrationData.MedicalRecord);
        formData.append('MedicalRedation', registrationData.MedicalRedation);
        const id = localStorage.getItem('Userid');

        try {
            setLoad(true);
            const response = await axios.post(`https://localhost:44389/api/Patient/AskOnlineObservation/${id}`, formData, { headers: { Authorization: `Bearer ${token}` } });
            console.log('Response:', response);
            console.log('Response Data:', response.data);
            console.log(response.status)
            if (response.data && response.status !== 400) {
               
                setUser(response);
                 if( response.data==='Observation already eaxists')
                {
                    alert('Observation already eaxists')
                }
                else{
                alert('your diagnosis rate'+response.data.diagnosis + '/4 ');}
                nav('/Showobserve');
            }
            localStorage.setItem('observationId', response.data.observationId);
        } catch (error) {
            setLoad(false);
            console.error('Registration error:', error);
            alert(error);
            
        }
    };

    const handleRegistrationInputChange = (event) => {
        const { name, value } = event.target;
        setRegistrationData({ ...registrationData, [name]: value });
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setRegistrationData({ ...registrationData, MedicalRedation: file });
    };

    return (
        <div className="login-r">
            <div className="login-box-r-o">
                <div className="login-header-r">
                    <header>Ask Observe</header>
                </div>

                <form onSubmit={handleRegistrationSubmit}>
                <div className="input-box-r hidden">
    <input
        className="input-field-r"
        type="text"
        value={registrationData.DoctorId}
        name="DoctorId"
        readOnly
    />
</div>

                    
                    
                    <div className="input-box-r">
                        <input
                            className="input-field-r"
                            type="number"
                            value={registrationData.Age}
                            onChange={handleRegistrationInputChange}
                            name="Age"
                            placeholder='Age'
                        />
                    </div>
                    <div className="input-box-r">
                        <input
                            className="input-field-r"
                            type="text"
                            value={registrationData.MedicalRecord}
                            onChange={handleRegistrationInputChange}
                            name="MedicalRecord"
                            placeholder='Medical Record'
                        />
                    </div>
                    <div className="input-box-r-center">
                        <input
                            className="input-field-r file-handle"
                            type="file"
                            onChange={handleFileInputChange}
                            name="MedicalRedation"
                        />
                    </div>
                    <div className="input-box-r">
                        <div className="radio-field-r">
                            <label className='md mb-2 blue'>
                                <input
                                    type="radio"
                                    name="Gender"
                                    value="0"
                                    checked={registrationData.Gender === '0'}
                                    onChange={handleRegistrationInputChange}
                                />
                                Male
                            </label>
                            <label className='blue '>
                                <input
                                    type="radio"
                                    name="Gender"
                                    value="1"
                                    checked={registrationData.Gender === '1'}
                                    onChange={handleRegistrationInputChange}
                                />
                                Female
                            </label>
                        </div>
                    </div>
                
                    {load && (
                        <div className="text-center my-3">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                    <div className="input-submit-r">
                        <button type="submit" className='submit-btn-r'>Observe</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AuthComponent;
