import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Logo2 from './Logo2';
import img from '../../public/constellation.jpg';

function MyCollection() {
  const [constellations, setConstellations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserConstellationData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found, redirecting to login...');
          setTimeout(() => navigate('/login'),
           2000);
          return;
        }
        const decodedToken = jwtDecode(token);
        console.log("decodedToken" , decodedToken);
        
        
        const userId = decodedToken.id || decodedToken._id;
        

        if (!userId) {
          setError('Invalid token. Please log in again.');
          return;
        }

        const response = await axios.get(`http://localhost:3000/user/constellations/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setConstellations(response.data.data); 
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Sorry! No constellation found :)');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserConstellationData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 flex flex-col">
      <Logo2 />
      <section className="bg-gray-300 p-4 h-full rounded-lg shadow-lg mt-10">
        <ul className="flex flex-wrap justify-center gap-4">
          {constellations.map((constellation) => {
            const { userId, name, story, meaning } = constellation;
            return (
               <li
                key={userId}
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-4 bg-black shadow-md rounded-lg border border-zinc-100 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <p className="text-gray-200 font-bold text-lg"> Name: {name}</p>
                <p className="text-gray-300 italic mt-1"> Meaning: {meaning}</p>
                <p className="text-gray-400 mt-2"> Story: {story}</p>
                
              
                

                <img alt="constellation" src={img} className="w-100 h-50 rounded-lg mt-2" />

                <div className="mt-4 flex gap-2">
                  <button className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-md">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded-md">
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default MyCollection;
