const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.URL)
        console.log("Database connect successfully");
        
    }catch(error){
        console.log("Error in database connection", error);
        process.exit(1);
    }
}

module.exports = dbConnect;