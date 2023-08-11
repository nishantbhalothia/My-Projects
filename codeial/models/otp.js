const mongoose = require('mongoose');
const User = require('./user');


const otpSchema = new mongoose.Schema({
    otp:{
        type : Number,
        required : true,
    },
    phone:{
        type : Number,  
        required : true,
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    createdAt:{
        type : Date,
        required : true,
        default : Date.now,
        expires : 300000
    }
},{
    timestamps : true
})


const Otp = mongoose.model('Otp', otpSchema);   
module.exports= Otp;