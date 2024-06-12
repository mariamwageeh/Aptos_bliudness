import logo from './logo.svg';
import './App.css';
// import { Elements } from '@stripe/react-stripe-js';
// import stripePromise from '../src/stripe';
// import jwtDecode from 'jwt-decode';
import Layout from './Component/Layout/Layout';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeP from './Component/HomeP/HomeP';
import HomeD from './Component/HomeD/HomeD';
import Showobserve from './Component/Showobserve/Showobserve';
import Acceptappointment from './Component/Acceptappointment/Acceptappointment';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import RegisterAdmin from './Component/RegisterAdmin/RegisterAdmin';
import Allappointment from './Component/Allappointment/Allappointment';
import UpdateD from './Component/UpdateD/UpdateD';
import Askonlineobserve from './Component/Askonlineobserve/Askonlineobserve';
import Deleteobserve from './Component/Deleteobserve/Deleteobserve';
import Notfound from './Component/Notfound/Notfound';
import History from './Component/History/History';
import Logout from './Component/Logout/Logout';
import Feedback from './Component/Feedback/Feedback';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Getalldocbyadmin from './Component/Getalldocbyadmin/Getalldocbyadmin';
import Report from './Component/Report/Report';
import UpdateP from './Component/UpdateP/UpdateP';
import Payment from './Component/Payment/Payment';
import Getallpatientbyadmin from './Component/Getallpatientbyadmin/Getallpatientbyadmin';
import Registerdoc from './Component/Registerdoc/Registerdoc';
import Showansweredobservation from './Component/Showansweredobservation/Showansweredobservation';
import AddRole from './Component/AddRole/AddRole';
import AddDoctor from './Component/AddDoctor/AddDoctor';
import GetAllDoctorsByAdmin from './Component/GetAllDoctorsByAdmin/GetAllDoctorsByAdmin';
import GetAllPatientsByAdmin from './Component/GetAllPatientsByAdmin/GetAllPatientsByAdmin';
import HomeAdmin from'./Component/HomeAdmin/HomeAdmin'
import Profile from './Component/Profile/Profile';
import ProfileD from './Component/ProfileD/ProfileD';
import HistoryD from './Component/HistoryD/HistoryD';
import Main from './Component/Main/Main';
import ShowReport from './Component/ShowReport/ShowReport';
import UploadImg from './Component/UploadImg/UploadImg';
import Editdiagnoses from './Component/Editdiagnoses/Editdiagnoses'

function App() {

useEffect(() => {
if(localStorage.getItem('Token')!==null)
{
  savedata();
}

},[])


  const [userdata,setuserdata]=useState(null);

  function savedata(){
   let encode= localStorage.getItem('Token');
 let decode=jwtDecode(encode);
  console.log(decode);
  localStorage.setItem("Role",decode.roles)
  localStorage.setItem("Userid",decode.Guid);
  //  localStorage.setItem('photo',decode.profileImg)
  console.log(localStorage.getItem('Userid'))
  setuserdata(decode);
  }

  // async function  getdel(){
  
  //   const token= localStorage.getItem('Token');
  //  const observationId=localStorage.getItem('observationId');

  //   let {data}= await axios.put(`https://localhost:44389/api/Patient/Delete/${observationId}`, { headers: { Authorization: `Bearer ${token}` } });
  // console.log(data)

  
  // }

// console.log({report})



  let router=createBrowserRouter([
    {path:"",element:<Layout userdata={userdata} setuserdata={setuserdata} />,children:[
      {index:true,element:<Main/>},
      {path:'HomeP' , element:<HomeP/>},
      {path:'Showobserve',element:<Showobserve /> },
      {path:'Showansweredobservation',element:<Showansweredobservation /> },
      {path:'Profile',element:<Profile /> },
      {path:'ProfileD',element:<ProfileD /> },
      {path:'History',element:<History/> },
      {path:'HistoryD',element:<HistoryD/> },
      {path:'HomeAdmin' , element:<HomeAdmin/>},
      {path:'addrole' , element:<AddRole/>},
      {path:'adddoctor' , element:<AddDoctor/>},
      {path:'alldoctors' , element:<GetAllDoctorsByAdmin/>},
      {path:'allpatiens' , element:<GetAllPatientsByAdmin/>},
       {path:'History',element:<History/> },
      {path:'Acceptappointment/:observationId',element:<Acceptappointment/> },
      {path:'Allappointment',element:<Allappointment /> },
      {path:'UpdateD',element:<UpdateD/> },
      {path:'Getalldocbyadmin',element:<Getalldocbyadmin/> },
      {path:'Getallpatientbyadmin',element:<Getallpatientbyadmin/> },
      {path:'Report/:observationId',element:<Report />  },
      {path:'ShowReport/:observationId',element:<ShowReport/>  },
      {path:'Askonlineobserve/:id',element:<Askonlineobserve />  },
      {path:'Payment/:observationId',element:<Payment/>  },
      {path:'Deleteobserve/:observationId',element:<Deleteobserve />  },
      {path:'Editdiagnoses/:observationId',element:<Editdiagnoses />  },
      {path:'Feedback/:observationId',element:<Feedback />  },
      {path:'HomeD',element:<HomeD/> },
      {path:'UploadImg',element:<UploadImg/> },
      {path:'Login',element: <Login savedata={savedata}/>},
      {path:'Register',element:<Register savedata={savedata}/> },
      {path:'RegisterAdmin',element:<RegisterAdmin/> },
      {path:'Registerdoc',element:<Registerdoc/> },
      {path:'Logout',element:<Logout/>},
      {path:'UpdateP',element:<UpdateP/>},
      
     
      {path:'*',element:<Notfound/>},
    ]}
  ]);
  return<>
  <RouterProvider router={router}>

  </RouterProvider>
 
  </>
}

export default App;
