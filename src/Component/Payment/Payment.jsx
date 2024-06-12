// import React from 'react';
// import styles from './Payment.css';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// export default function Report() {
//   const { observationId } = useParams();
//   const token = localStorage.getItem('Token');
//   let navigate = useNavigate();
  
//   async function pay() {
//     try {
//       const response = await axios.post(
//         `https://localhost:44389/api/patient/createpayment/${observationId}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       // Directly navigate to the payment URL in response.data
//       window.location.href = response.data;
//       console.log(response);
//     } catch (error) {
//       // Handle errors
//       console.error('report error:', error);
//       if (error.response && error.response.status === 400) {
//         alert('Payment failed');
//       }
//     }
//   }

//   return (
//     <div>
//       <button onClick={pay}>Pay Now</button>
//     </div>
//   );
// }
