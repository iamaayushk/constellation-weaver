import React from 'react';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <div className='flex items-center justify-between p-4 bg-zinc-200'>
      <div className='text-3xl font-black text-zinc-800  font-serif cursor-pointer'>
       Constella
      </div>

      <div className='flex text-xl font-semibold text-zinc-800 gap-8'>
        <div className="cursor-pointer">
          <Link to='/login' className='hover:text-blue-400 transition duration-300'>
            Login
          </Link>
        </div>
        <div className="cursor-pointer">
          <Link to='/Signup' className='hover:text-blue-400 transition duration-300'>
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Logo;
