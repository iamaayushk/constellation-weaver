import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Logo2 from './Logo2';

const SaveConstellationForm = () => {
  const [name, setName] = useState('');
  const [meaning, setMeaning] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !meaning) {
      setError('Please fill in both fields');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      setError('No token found, please login again.');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      console.log("Decoded token", decodedToken);
      
      const userId = decodedToken.id || decodedToken._id;

      if (!userId) {
        setError('Invalid token. Please log in again.');
        return;
      }

      const constellationData = { name, meaning, userId };

      const response = await axios.post(
        `http://localhost:3000/user/save`,constellationData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("data",response.data);
      
      if (response.data?.success) {
        setSuccess('Constellation saved successfully');
        setError('');
        setName('');
        setMeaning('');
      } else {
        setError(response.data?.message || 'Failed to save constellation');
      }
    } catch (err) {
      setError('Error while saving constellation. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Logo2 />
      <div className="flex flex-grow items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg space-y-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Save Your Constellation</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Constellation Name</label>
            <input id="name" type="text"value={name} onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter constellation name" required />
          </div>

          
          <div className="mb-4">
            <label htmlFor="meaning" className="block text-sm font-medium text-gray-700"> Meaning </label>
            <input id="meaning" type="text" value={meaning} onChange={(e) => setMeaning(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter the meaning of the constellation" required/>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <div className="flex justify-center">
            <button type="submit"
              className="px-6 py-3 cursor-pointer bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
              Save Constellation </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveConstellationForm;
