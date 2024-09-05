import React from 'react'
import { FaTasks } from "react-icons/fa";


const Navbar = () => {
  return (
    <nav className='flex justify-between p-2 bg-teal-800'>
      <div className="logo cursor-pointer flex items-center gap-3">
      <FaTasks className=' invert'/>
        <h1 className='text-lg text-white font-extrabold'>iTasks</h1>
      </div>
      <ul className='flex list-none gap-4'>
        <li className='text-white cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='text-white cursor-pointer hover:font-bold transition-all'>Your Task</li>

      </ul>
    </nav>
  )
}

export default Navbar
