import React from 'react'
import Home from '../pages/Home'
import { useNavigate } from 'react-router-dom'
import { NotebookPen, PenSquare, BadgeCheck, Activity, User, Mail, FileText } from "lucide-react";

const Sidebar = ({ setActive }) => {
  const navigate = useNavigate();
  return (
    <div className='w-60 fixed top-17 left-0 h-screen p-6 border-r z-100'>
      <div className='flex flex-col items-left justify-between h-full'>
        <div className=''>
          <h4 className='font-bold text-lg mb-3'>Dashboard</h4>
          <button onClick={() => navigate('/')} className='text-left cursor-pointer'>View Site</button>
        </div>
        <div className='flex flex-col gap-5'>
          <button onClick={() => setActive("dashboard")} className='flex justify-start items-center gap-3 text-left cursor-pointer'>
            <FileText size={20}/>
            Post
          </button>
      
          <button onClick={() => setActive("draft")} className='flex justify-start items-center gap-3 text-left cursor-pointer'>
            <PenSquare size={20}/>
            Draft
          </button>
          <button onClick={() => setActive("published")} className='flex justify-start items-center gap-3 text-left cursor-pointer'>
            <BadgeCheck size={20}/>
            Published
          </button>
          <button onClick={() => setActive("newsletter")} className='flex justify-start items-center gap-3 text-left cursor-pointer'>
            <Mail />
            Newsletter
          </button>
        </div>


        <div className='flex flex-col gap-5'>
          <h2 className='font-bold text-lg'>Analytics</h2>
          <button onClick={() => setActive("monitoring")} className='flex justify-start items-center gap-3 text-left cursor-pointer'>
            <Activity size={20}/>
            Monitoring
          </button>
        </div>
        <div className='flex flex-col gap-5 mb-20'>
          <h2 className='font-bold text-lg'>User</h2>
          <button onClick={() => setActive("monitoring")} className='flex justify-start items-center gap-3 text-left cursor-pointer'>
            <User size={20}/>
            Profile
          </button>
        </div>
      </div>


    </div>

  )
}

export default Sidebar