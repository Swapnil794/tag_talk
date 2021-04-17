const mongooose = require('mongoose');

var organizationSchema = new mongooose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        maxlength:50,
        trim:true
    },
    users:[String]

},{timestamps:true})

module.exports = mongooose.model("Organization",organizationSchema);