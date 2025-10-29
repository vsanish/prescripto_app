// import React, { useContext } from 'react'
// import Login from './pages/Login'
// import { ToastContainer, toast } from 'react-toastify';
// import { AdminContext } from './context/AdminContext';
// import Navbar from './components/Navbar.jsx';
// import Sidebar from './components/Sidebar.jsx';
// import { Routes,Route, Router } from 'react-router-dom';
// import Dashboard from './pages/Admin/Dashboard.jsx';
// import AllApointments from './pages/Admin/AllApointments.jsx';
// import AddDoctor from './pages/Admin/AddDoctor.jsx';
// import DoctorList from './pages/Admin/DoctorList.jsx';
// import { DoctorContext } from './context/DoctorContext.jsx';
// import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx'
// import DoctorAppointments from './pages/Doctor/DoctorAppointments.jsx';
// import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';
// import { useContext } from 'react';


// const App = () => {

//   const { aToken } = useContext(AdminContext);
//   const { dToken } = useContext(DoctorContext);



//   return   (
//     <div className='bg-[#F8F9FD]'>
//       <ToastContainer/>
//       <Navbar/>
//       <div className='flex items-start'>
//         <Sidebar/>
//         <Router>
//            {(aToken || dToken) && <Sidebar />}
//           <Routes>
//             {/* Admin Routes */}
//             <Route path='/' element={<Login/>}/>
//             <Route path='/admin-dashboard' element={ aToken && userType === 'admin' ? <Dashboard/>:  <Navigate to="/" />}/>
//             <Route path='/all-appointments' element={<AllApointments/>}/>
//             <Route path='/add-doctor' element={<AddDoctor/>}/>
//             <Route path='/doctor-list' element={<DoctorList/>}/>

//             {/* Doctor Routes */}
//             <Route path='/doctor-dashboard' element={ dToken && userType === 'doctor' ? <DoctorDashboard/> : <Navigate to="/" />}/>
//             <Route path='/doctor-appointments' element={<DoctorAppointments />}/>
//             <Route path='/doctor-profile' element={<DoctorProfile />}/>


//           </Routes>
//         </Router>
//       </div>
//     </div>
//   ):
//   (
//     <>
//       <Login/>
//       <ToastContainer/>
//     </>
//   )
// }

// export default App


// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import Login from './pages/Login';

// // Admin pages
// import Dashboard from './pages/Admin/Dashboard';
// import AllApointments from './pages/Admin/AllApointments';
// import AddDoctor from './pages/Admin/AddDoctor';
// import DoctorList from './pages/Admin/DoctorList';

// // Doctor pages
// import DoctorDashboard from './pages/Doctor/DoctorDashboard';
// import DoctorAppointments from './pages/Doctor/DoctorAppointments';
// import DoctorProfile from './pages/Doctor/DoctorProfile';

// // Contexts
// import { AdminContext } from './context/AdminContext';
// import { DoctorContext } from './context/DoctorContext';

// const App = () => {
//   const { aToken } = useContext(AdminContext);
//   const { dToken } = useContext(DoctorContext);

//   const userType = localStorage.getItem('userType'); 

//   return (
//     <div className="bg-[#F8F9FD] min-h-screen">
//       <ToastContainer />

//       <Router>
//         {(aToken || dToken) && <Navbar />}

//         <div className="flex items-start">
//           {(aToken || dToken) && <Sidebar />}

//           <div className="flex-1 p-4">
//             <Routes>
//               {/* Login */}
//               <Route path="/" element={<Login />} />

//               {/* ------------------ ADMIN ROUTES ------------------ */}
//               <Route
//                 path="/admin-dashboard"
//                 element={
//                   aToken && userType === 'admin' ? (
//                     <Dashboard />
//                   ) : (
//                     <Navigate to="/" />
//                   )
//                 }
//               />
//               <Route
//                 path="/all-appointments"
//                 element={
//                   aToken && userType === 'admin' ? (
//                     <AllApointments />
//                   ) : (
//                     <Navigate to="/" />
//                   )
//                 }
//               />
//               <Route
//                 path="/add-doctor"
//                 element={
//                   aToken && userType === 'admin' ? (
//                     <AddDoctor />
//                   ) : (
//                     <Navigate to="/" />
//                   )
//                 }
//               />
//               <Route
//                 path="/doctor-list"
//                 element={
//                   aToken && userType === 'admin' ? (
//                     <DoctorList />
//                   ) : (
//                     <Navigate to="/" />
//                   )
//                 }
//               />

//               {/* ------------------ DOCTOR ROUTES ------------------ */}
//               <Route
//                 path="/doctor-dashboard"
//                 element={
//                   dToken && userType === 'doctor' ? (
//                     <DoctorDashboard />
//                   ) : (
//                     <Navigate to="/" />
//                   )
//                 }
//               />
//               <Route
//                 path="/doctor-appointments"
//                 element={
//                   dToken && userType === 'doctor' ? (
//                     <DoctorAppointments />
//                   ) : (
//                     <Navigate to="/" />
//                   )
//                 }
//               />
//               <Route
//                 path="/doctor-profile"
//                 element={
//                   dToken && userType === 'doctor' ? (
//                     <DoctorProfile />
//                   ) : (
//                     <Navigate to="/" />
//                   )
//                 }
//               />
//             </Routes>
//           </div>
//         </div>
//       </Router>
//     </div>
//   );
// };

// export default App;




//This is App.jsx

import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Contexts
import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const userType = localStorage.getItem('userType');
  const location = useLocation();




  //  If not logged in — show ONLY login page
  if (!aToken && !dToken) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer />
      </>
    );
  }

  // Logged-in layout (Admin / Doctor)
  return (
    <div className="bg-[#F8F9FD] min-h-screen">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            {/* Admin Routes */}
            <Route
              path="/admin-dashboard"
              element={
                aToken && userType === 'admin' ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/all-appointments"
              element={
                aToken && userType === 'admin' ? (
                  <AllAppointments />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/add-doctor"
              element={
                aToken && userType === 'admin' ? (
                  <AddDoctor />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/doctor-list"
              element={
                aToken && userType === 'admin' ? (
                  <DoctorList />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            {/* Doctor Routes */}
            <Route
              path="/doctor-dashboard"
              element={
                dToken && userType === 'doctor' ? (
                  <DoctorDashboard />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/doctor-appointments"
              element={
                dToken && userType === 'doctor' ? (
                  <DoctorAppointments />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/doctor-profile"
              element={
                dToken && userType === 'doctor' ? (
                  <DoctorProfile />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            {/* Default Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;



