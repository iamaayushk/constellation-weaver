import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../Components/Logo';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, email, password };

    try {
      const response = await axios.post('http://localhost:3000/user/signup', userData);

      if (response.data.success) {
        setSuccess('Signup successful!'); 
        setError(''); 


        setTimeout(() => {
          navigate('/login'); 
        }, 2000); 
      } else {
        setSuccess('');  
        setError(response.data.message);
      }

      console.log(response.data);
    } catch (err) {
      setError('Signup failed. Please try again.');
      setSuccess('');
      console.error(err);
    }
  };

  return (
    <div className='bg-zinc-100 w-full min-h-screen flex justify-center items-center flex-col pt-20'>
      <div className='fixed top-0 left-0 w-full z-50'>
        <Logo />
      </div>

      <h1 className='font-bold text-3xl mb-4'>Welcome</h1>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col border border-zinc-200 w-auto h-auto gap-3 p-10 shadow-lg bg-white rounded-lg'
      >
        <input
          className='outline-none border border-zinc-300 px-2 py-3 rounded w-[300px] focus:ring-1 focus:ring-zinc-900'
          type='text'
          placeholder='Enter your Name'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className='outline-none border border-zinc-300 px-2 py-3 rounded w-[300px] focus:ring-1 focus:ring-zinc-900'
          type='email'
          placeholder='Enter your Email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className='outline-none border border-zinc-300 px-2 py-3 rounded w-[300px] focus:ring-1 focus:ring-zinc-900'
          type='password'
          placeholder='Enter your Password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type='submit'
          className='bg-zinc-900 py-3 px-2 cursor-pointer border-2 text-white rounded-md font-semibold mt-4 shadow-md hover:bg-white hover:border-zinc-900 hover:text-black transition duration-300 hover:scale-105'
        >
          Submit
        </button>

        <h1>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-500'>
            Login
          </Link>
        </h1>

        {error && <p className='text-red-500'>{error}</p>}
        {success && <p className='text-green-500'>{success}</p>} 
      </form>
    </div>
  );
}

export default Signup;
