import React from 'react'
import { FaChevronLeft, FaChevronRight, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()


  const canGoBack = window.history.state && window.history.length > 1

  return (
    <div className='flex items-center justify-between mb-6 flex-wrap'>

      {/* BACK / FORWARD BUTTONS */}
      <div className='flex gap-3'>

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          disabled={!canGoBack}
          className={`rounded-full p-3 transition ${
            canGoBack
              ? 'bg-gray-800 hover:bg-gray-700'
              : 'bg-gray-900 text-gray-600 cursor-not-allowed'
          }`}
        >
          <FaChevronLeft />
        </button>

        {/* FORWARD */}
        <button
          onClick={() => navigate(1)}
          className='bg-gray-800 rounded-full p-3 hover:bg-gray-700 transition'
        >
          <FaChevronRight />
        </button>

      </div>

      {/* USER */}
      <button className='flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-full'>
        <FaUser />
        <span>Mehul</span>
      </button>

    </div>
  )
}

export default Navbar