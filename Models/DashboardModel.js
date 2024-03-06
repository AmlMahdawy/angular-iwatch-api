const validator = require('validator');
const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
    name:{type:String, required:true, minLength:3, maxLength:30},
    email:{
        type:String,
        required:true,
    },
    password:{type:String, minLength:5, required:true},
    isAdmin:{type:Boolean},
    purchased:[],
    favourite:[],
    cart:[]

})
module.exports = mongoose.model("Dashboard",DashboardSchema);