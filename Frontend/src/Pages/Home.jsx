import React from 'react';
import constellation from '../assets/const2.jpg';
import Logo from '../Components/Logo';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img
        src={constellation}
        alt="constellation wallpaper"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content on top */}
      <div className="relative z-10 p-4">
        {/* <div className='flex items-center justify-between p-4 bg-transparent backdrop-blur-sm'> */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/30 via-black/20 to-transparent backdrop-blur-md">

          <div className='text-2xl font-black text-zinc-300  font-serif cursor-pointer'>
            Constella
            {/* Constella – (A sleek, modern take on "Constellation") */}
          </div>

          <div className='flex text-xl font-semibold text-white gap-8'>

            <div className="cursor-pointer">
              <Link to='/signup'
                className='px-4 py-2 text-lg font-semibold text-white bg-zinc-600 rounded-lg shadow-md hover:bg-blue-700 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out'>
                Start Creating
              </Link>
            </div>

          </div>
        </div>
        <div className="mt-[7.5rem] flex flex-col items-center text-center gap-6">
          <div className="px-12 py-8 max-w-2xl rounded-lg">
            <h1 className="text-3xl font-bold text-zinc-200 drop-shadow-md leading-relaxed">
              Create and share your own constellations, explore celestial stories, and build a folklore of the stars.
            </h1>
          </div>

          <Link
            to='/login'
            className="px-6 py-3 text-lg font-bold text-white  bg-transparent rounded-lg shadow-md  border-2 border-white
              hover:bg-emerald-700 hover:scale-105 hover:text-amber-50 hover:shadow-lg transition-all duration-300 ease-in-out" >
            Explore Stars
          </Link>
        </div>



      </div>
    </div>
  );
}

export default Home;
