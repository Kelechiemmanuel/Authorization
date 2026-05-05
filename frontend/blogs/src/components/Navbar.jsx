import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = async () => {
    localStorage.removeItem("user");
    navigate('/login');
  }
  return (
    <nav className='flex justify-between p-4 px-20 bg-gray-100 items-center'>
      <Link to="/">Home</Link>

      <div className='flex gap-4 justify-center items-center'>
        <Link to="/login" className=''>Login</Link>{" "}
        <Link to="/register" className='bg-black text-white px-4 text-[16px] py-2 rounded'>Register</Link>
      </div>

      {/* {user && <Link to="/profile">Profile</Link>}{" "}

  {user?.role === "admin" && (
    <Link to="/dashboard">Dashboard</Link>
  )}{" "}

  {!user ? (
    <>
    <div className='flex gap-4 justify-center items-center'>
      <Link to="/login" className=''>Login</Link>{" "}
      <Link to="/register" className='bg-black text-white px-4 text-[16px] py-2 rounded'>Register</Link>
    </div>
    </>
  ) : (
    <button onClick={logout} className='cursor-pointer'>
      Logout
    </button>
  )} */}
    </nav>
  )
}

export default Navbar;