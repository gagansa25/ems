import React from 'react'

const Header = ({ name = 'Admin', handleLogout }) => {
  return (
    <div className='flex items-end justify-between gap-4'>
      <h1 className='text-2xl font-medium'>Hello <br /><span className='text-3xl font-semibold'>{name}</span> </h1>
      <button onClick={handleLogout} className='bg-red-600 text-lg font-bold text-white py-2 px-4 rounded hover:bg-red-700'>Log Out</button>
    </div>
  )
}

export default Header
