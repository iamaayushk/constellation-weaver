const express= require('express');
const app= express();
const cors= require('cors');
const cookieParser = require("cookie-parser");
// app.use(express.json()); 
app.use(cookieParser()); // Ensure cookie-parser is used before routes
app.use(cors({
    origin: 'http://localhost:5173',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const dbConnect = require('./config/database');

const user = require('./routes/user');
app.use('/user',user);



dbConnect();

app.listen(3000,()=>{
    console.log("Server started at port 3000");
})
