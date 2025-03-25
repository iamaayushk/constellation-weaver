import React from 'react'
import { useState } from 'react';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div className=" border-2 border-red-500 flex flex-col justify-center items-center h-screen bg-gray-100">
            <h2 className='text-3xl font-semibold text-center mb-5'>Welcome Back</h2>
            <form onSubmit={handleSubmit} className="p-6 flex justify-center items-center flex-col border-2 border-red-500 w-[50%] ">
               
                <input
                    type="email"
                    placeholder="Email address*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[50%] p-2 mb-3 border border-gray-300 rounded  focus:outline-none focus: ring-1 focus:ring-green-600"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[50%] p-2 mb-3 border border-gray-300 rounded focus:outline-none focus: ring-1 focus:ring-green-600"
                    required
                />
                <button type="submit" className="w-[50%] p-2 bg-emerald-500 text-white rounded hover:bg-emerald-600">Continue</button>
            </form>
        </div>

    )
}

export default Login