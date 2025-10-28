  import React, { useContext } from 'react'
  import { AdminContext } from '../context/AdminContext'
  import { assets } from '../assets/assets'
  import { useNavigate } from 'react-router-dom';
  import { DoctorContext } from '../context/DoctorContext';

  const Navbar = () => {

    const {aToken,setAToken} = useContext(AdminContext);
    const {dToken,setDToken}  = useContext(DoctorContext)

    const navigate = useNavigate();
    const userType = localStorage.getItem('userType');

    const handleLogout = () => {
      if (userType === 'admin') {
        setAToken('');
        localStorage.removeItem('aToken');
      } else if (userType === 'doctor') {
        setDToken('');
        localStorage.removeItem('dToken');
      }
      localStorage.removeItem('userType');
      navigate('/');
    };

    if (!aToken && !dToken) return null;

    return (
      <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
          <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt=''/>
          <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 '>{aToken ? 'Admin':'Doctor'}</p>
        </div>
        <button onClick={handleLogout} className='bg-violet-600 text-white text-sm px-10 py-2 rounded-full'>Logout</button>
      </div>
    )
  }

  export default Navbar;
