import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../Components/Logo';
import { AuthContext } from '../../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      const response = await axios.post('http://localhost:3000/user/login', userData);

      
      login(response.data.token);

      
      setSuccess("Login Successfully");
      setError("");

      console.log("Response Data:", response.data);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError("Login Failed. Please try again.");
      setSuccess('');
      console.log(err);
    }
  };

  return (
    <div className='bg-zinc-100 w-full min-h-screen flex justify-center items-center flex-col'>
      <div className='fixed top-0 left-0 w-full z-50'>
        <Logo />
      </div>

      <h1 className='font-bold text-3xl mb-4'>Welcome Back</h1>
      <form onSubmit={handleSubmit} className='flex flex-col border-1 border-zinc-200 w-auto h-auto gap-3 p-10 shadow-lg'>
        <input
          className='outline-none border-1 border-zinc-300 px-2 py-3 rounded w-[300px] focus:ring-1 focus:ring-zinc-900'
          type="email"
          placeholder='Enter your Email'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          required/>
        <input
          className='outline-none border-1 border-zinc-300 px-2 py-3 rounded w-[300px] focus:ring-1 focus:ring-zinc-900'
          type="password"
          placeholder='Enter your Password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          required/>
        <button type='submit' className='bg-zinc-900 py-3 px-2 cursor-pointer border-2 text-white rounded-md font-semibold mt-4 shadow-md hover:bg-white hover:border-zinc-900 hover:text-black transition duration-300 hover:scale-105'>
          Submit</button>
        <h1>Don't have an account? <Link to="/signup" className="text-blue-500">SignUp</Link></h1>
        {error && <p className='text-red-500'>{error}</p>}
        {success && <p className='text-green-500'>{success}</p>}
      </form>
    </div>
  );
}

export default Login;
