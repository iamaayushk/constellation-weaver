const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    createAt:{
        type:Date,
        default:Date.now,
    }
});

module.exports = mongoose.model("User", userSchema);