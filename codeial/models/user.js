const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars'); // path where the image will be stored

// Schema for the user
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required:true,  
    },
    confirm_password:{
        type:String,
        required:true,
    },
    avatar:{    
        type:String, // this is the path of file database only stores the path of the uploaded file,, file stored somewhere else
    }

},{
    timestamps:true,
});

// Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH)) // path where the image will be stored
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix) // file.fieldname is avatar and uniqueSuffix is the random number (with timestamp and random number)
    }
  })

// static function
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');  
userSchema.statics.avatarPath = AVATAR_PATH; // making the path available to the userSchema
  
// const upload = multer({ storage: storage })
const User = mongoose.model('User',userSchema);
module.exports = User;  // exporting the model
