import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
    
    const {aToken,setAToken} = useContext(AdminContext);
    const {dToken,setDToken} = useContext(DoctorContext);
    const navigate = useNavigate();

    const userType = localStorage.getItem('userType');

    const handleLogout = () => {
      if (userType === 'admin') {
        localStorage.removeItem('aToken');
        setAToken('');
      } else if (userType === 'doctor') {
        localStorage.removeItem('dToken');
        setDToken('');
      }
      localStorage.removeItem('userType');
      navigate('/'); 
    };

   
  if (userType === 'admin' && aToken){    
  return (
    <div className='min-h-screen bg-white border-r'>
      {

          <ul className='text-[#515151] mt-5'>

              <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF] border-r-4 border-violet-600':''}`} to={'/admin-dashboard'}>
                  <img src={assets.home_icon} alt="" />
                  <p className='hidden md:block'>Dashboard</p>
              </NavLink>

              <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF] border-r-4 border-violet-600':''}`} to={'/all-appointments'}>
                  <img src={assets.appointment_icon} alt="" />
                  <p className='hidden md:block'>Appointments</p>
              </NavLink>

              <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF] border-r-4 border-violet-600':''}`} to={'/add-doctor'}>
                  <img src={assets.add_icon} alt="" />
                  <p className='hidden md:block'>Add Doctor</p>
              </NavLink>
          
              <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF] border-r-4 border-violet-600':''}`} to={'/doctor-list'}>
                  <img src={assets.people_icon} alt="" />
                  <p className='hidden md:block'>Doctors List</p>
              </NavLink>

            
          </ul>
        }
        </div>
      );
      }

      if (userType === 'doctor' && dToken) {
        return (
        <div className="min-h-screen bg-white border-r">
        <ul className='text-[#515151] mt-5'>

            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF] border-r-4 border-violet-600':''}`} to={'/doctor-dashboard'}>
                <img src={assets.home_icon} alt="" />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>

            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF] border-r-4 border-violet-600':''}`} to={'/doctor-appointments'}>
                <img src={assets.appointment_icon} alt="" />
                <p className='hidden md:block'>Appointments</p>
            </NavLink>

            
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF] border-r-4 border-violet-600':''}`} to={'/doctor-profile'}>
                <img src={assets.people_icon} alt="" />
                <p className='hidden md:block'>Profile</p>
            </NavLink>

            

        </ul>
        </div>
        );
      }
      return null;
}

export default Sidebar

