import React from 'react'

const Sidebar = ({ setActive }) => {
  return (
    <div className='w-60 fixed top-14 left-0 h-screen bg-blue-600 text-white p-6'>
      <div className='flex flex-col items-left justify-between h-full'>
        <div className='flex flex-col gap-5'>
          <h4 className='font-bold text-lg'>Dashboard</h4>
          <h4 className='font-bold text-lg'>Posts</h4>
          <button onClick={() => setActive("draft")} className='text-left'>Draft</button>
          <button onClick={() => setActive("published")} className='text-left'>Published</button>
          <button onClick={() => setActive("newsletter")} className='text-left'>Newsletter</button>
        </div>


        <div className=''>
          <h2 className='font-bold text-lg'>Analytics</h2>
          <button onClick={() => setActive("monitoring")} className='text-left'>Monitoring</button>
        </div>


        <div className='mb-10'>
          <h2 className='font-bold text-lg'>User Info</h2>
          <button onClick={() => setActive("profile")} className='text-left'>Profile</button>
        </div>
      </div>


    </div>

  )
}

export default Sidebar