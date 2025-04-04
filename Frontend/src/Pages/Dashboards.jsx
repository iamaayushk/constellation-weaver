import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ConstellationCanvas from "../Components/ConstellationCanvas";
import { AuthContext } from "../../context/AuthContext";  

const Dashboards = () => {
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext); 

    
    if (!user) {
        navigate("/login");
        return (
          <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-lg text-center">
              <h1 className="text-2xl font-bold text-gray-800">You are not logged in</h1>
              <p className="text-gray-600 mt-2">Please log in to access the dashboard again :)</p>
              <button onClick={() => navigate("/login")}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                Login  </button>
            </div>
          </div>
        );
      }
      

    const profile = [
        {
            name: "Profile",
            icon: <i className="ri-user-line mr-2"></i>,
        },
        {
            name: "My Constellation",
            icon: <i className="ri-star-line mr-2"></i>,
            action: () => navigate("/mycollection"),
        },
        {
            name: "Logout",
            icon: <i className="ri-login-box-line mr-2"></i>,
            action: () => {
                localStorage.removeItem("token");  
                navigate("/login"); 
            },
        },
    ];

    return (
        <div className="w-full min-h-screen flex flex-col">
            
            <div className="w-full h-[65px] flex justify-between items-center px-10 sticky top-0 bg-zinc-300 z-50">
                <h1 className="text-3xl font-black text-zinc-800 font-serif cursor-pointer">Constella </h1>

                
                <div className="relative">
                    <div
                        className="w-[40px] border border-zinc-400 h-[40px] rounded cursor-pointer"
                        onClick={() => setMenu(!menu)}>
                        <img src="https://api.dicebear.com/9.x/initials/svg?seed=AKS" alt="Profile" className="rounded"/>
                    </div>
                    {menu && (
                        <div className="absolute right-2 mt-2 w-40 text-sm bg-white shadow-lg rounded-lg py-2 flex flex-col gap-1 p-2 z-50">
                            {profile.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (item.action) item.action();
                                        setMenu(false);
                                    }}
                                    className="flex items-center p-2 hover:bg-zinc-200 w-full text-left cursor-pointer"
                                >
                                    {item.icon} {item.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            
            <div className="relative z-0 mt-2">
                <ConstellationCanvas />
            </div>
        </div>
    );
};

export default Dashboards;
