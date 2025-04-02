import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ generateStars , onDelete }) => {
  const navigate=useNavigate();
  const onSave=()=>{
    navigate('/save');
  }
  return (
    <div className="bg-zinc-100 fixed bottom-5 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-2xl border border-zinc-400 shadow-md">
      <div className="flex space-x-3 text-[18px]">
        <button  onClick={generateStars} className="hover:bg-zinc-200 px-3 py-2 rounded cursor-pointer">
          <i className="ri-bard-line"></i>
        </button>
        <button onClick={onSave} className="hover:bg-zinc-200 px-3 py-2 rounded cursor-pointer">
          <i className="ri-save-line"></i>
        </button>
        <button onClick={onDelete} className="hover:bg-zinc-200 px-3 py-2 rounded cursor-pointer">
          <i className="ri-delete-bin-6-line"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;