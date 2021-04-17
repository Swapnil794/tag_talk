const mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
    {
        user:{
            type:String,
            required:true,
            minlength:3,
            trim:true
        },
        email:{
            type:String,
        //     required:true,
        //    unique:true,
        //     trim:true
        }
    },{timestamps:true}
)
module.exports = mongoose.model("User",userSchema);