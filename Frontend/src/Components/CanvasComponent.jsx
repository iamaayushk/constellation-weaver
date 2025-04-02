import React from "react";
import { useRef, useState, useEffect } from "react";
import Navbar from "./Navbar";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [stars, setStars] = useState([]);

  const generateStars = () => {
    console.log("Generating stars..."); 

    const newStars = [];
    const number = 200;
    const width = 800;
    const height = 800;

    for (let i = 0; i < number; i++) {
      newStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
      });
    }

    setStars(newStars);
  };

  useEffect(() => {
    console.log("Stars Updated:", stars); 

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    stars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [stars]);

  const onDelete = () => {
    setStars([]); 
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Navbar generateStars={generateStars} onDelete=  {onDelete}  /> 
      <canvas ref={canvasRef} width={800} height={800} className="border" />
    </div>
  );
};

export default CanvasComponent;