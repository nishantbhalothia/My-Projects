const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',  
    },  
    // this defines the object id of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        required:true,  
        refPath:'onModel', // dynamic reference
    },
    // this field is used for defining the type of the liked object since this is a dynamic reference
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment'], // this is the enum for the type of the liked object
    }   
},{
    timestamps:true,
});


const Like = mongoose.model('Like',likeSchema);
module.exports = Like;  // exporting the model