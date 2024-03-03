const AuthModel = require('../Models/AuthModel');
const AuthController = require("../Controllers/AuthController")

const ReservationModel = require("../Models/ReservationModel")



let GetUserById = async (userID) => {
    return await AuthModel.findOne({ _id: userID })
}
let GetUserCart = async (req, res, next) => {

    let userID = await AuthController.decodeToken(req, res)
    let user = await GetUserById(userID)
    let totalPrice=0;
    user.cart.forEach((movie)=>{
      totalPrice=totalPrice+(  movie.seats.length*100)
    })
    res.send({cart:user.cart,totalPrice:totalPrice})
}
let GetUserData = async (req, res, next) => {

    let userID = await AuthController.decodeToken(req, res)

    let user = await GetUserById(userID)

    res.send({
        name: user.name,
        email: user.email,
        favourite: user.favourite,
        purchased: user.purchased
    })
}

module.exports = {
    GetUserCart,
    GetUserData,
    GetUserById
}

