import React, { useRef, useState, useEffect } from "react";
import Navbar from "./Navbar";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [stars, setStars] = useState([]); 
  const [clickedPoints, setClickedPoints] = useState([]); 

  
  const generateStars = () => {
    console.log("Generating stars...");

    const newStars = [];
    const number = 100;
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

 
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

   
    console.log(`Coordinates: X: ${x}, Y: ${y}`);

   
    setClickedPoints((prevPoints) => [...prevPoints, { x, y }]);
  };

  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.fillStyle = "black"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white"; // Star color
    stars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, 3, 0, Math.PI * 2); 
      ctx.fill();
    });

  
    ctx.strokeStyle = "white"; // Line color
    ctx.lineWidth = 1; 

    for (let i = 0; i < clickedPoints.length - 1; i++) {
      const point1 = clickedPoints[i];
      const point2 = clickedPoints[i + 1];

     
      ctx.beginPath();
      ctx.moveTo(point1.x, point1.y);
      ctx.lineTo(point2.x, point2.y);
      ctx.stroke();
    }

  }, [stars, clickedPoints]); 

  const onDelete = () => {
    setStars([]);
    setClickedPoints([]);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Navbar generateStars={generateStars} onDelete={onDelete} />
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="border"
        onClick={handleCanvasClick} 
      />
    </div>
  );
};

export default CanvasComponent;
