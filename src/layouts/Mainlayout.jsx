import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import MusicPlayer from '../components/MusicPlayer';

const Mainlayout = () => {
  return (
    <div className='min-h-screen bg-black text-white'>

        <div className='flex'>

            <aside className='w-64 border-r border-gray-800 p-4'>
                <Sidebar />
            </aside>

            <main className='flex-1 p-6'>
                <Navbar />
                <Outlet />
            </main>
         </div>

        <footer className='h-20 flex justify-center items-center border-t border-gray-800'>
            <MusicPlayer />
        </footer>
    </div>
  );
}

export default Mainlayout