const AuthModel = require('../Models/AuthModel');
const ReservationModel=require("../Models/ReservationModel")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');



let GetUserCart= async (req,res,next)=>{
    let token=req.header("Authorization")
    let userID= jwt.verify(token,"secret").id
    let cart =await ReservationModel.find({ "reserved.userId": userID })
    console.log(cart)
    res.send({cart:cart})
}

module.exports={
    GetUserCart
}

//reserved =[{}]