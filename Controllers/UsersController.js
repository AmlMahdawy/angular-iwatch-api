const AuthModel = require('../Models/AuthModel');
const AuthController = require("../Controllers/AuthController")
const MoviesModel=require("../Models/MoviesModel")
const ReservationModel = require("../Models/ReservationModel");
const { json } = require('express');



let GetUserById = async (userID) => {
    return await AuthModel.findOne({ _id: userID })
}
let GetUserCart = async (req, res, next) => {

    let userID = await AuthController.decodeToken(req, res)
    let user = await GetUserById(userID)
    let totalPrice = 0;
    user.cart.forEach((movie) => {
        totalPrice = totalPrice + (movie.seats.length * 100)
    })
    res.send({ cart: user.cart, totalPrice: totalPrice })
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
let DeleteMovieFromCart = async (req, res, next) => {

    let deletedMovie = req.body.deletedMovie
    let userID = await AuthController.decodeToken(req, res)
    let user = await GetUserById(userID)
    let message = "movie not found"

    user.cart.forEach(async (movie, i) => {
        if (JSON.stringify(movie) == JSON.stringify(deletedMovie)) {
            user.cart.splice(i, 1)
          await  user.save()
            message = "deleted"
        }

    })
    res.send({ message: message })

}

let AddToFavourites= async(req,res,next)=>{
    let movieName=req.body.movie
    let userID = await AuthController.decodeToken(req, res)
    let user = await GetUserById(userID)
    let movie= await MoviesModel.findOne({Title:movieName})
    user.favourite.push(movie)
   await user.save()
   res.send({message:"Added To Favourites"})


}
let RemoveFromFavourites=async(req,res,next)=>{
    let movieName=req.body.movie
    let userID = await AuthController.decodeToken(req, res)
    let user = await GetUserById(userID)
    let movie= await MoviesModel.findOne({Title:movieName})
    
    user.favourite.forEach( async(fav,i)=>{
        if(JSON.stringify(movie)==JSON.stringify(fav)){
            user.favourite.splice(i,1)
            await user.save()
   res.send({message:"Removed From Favourites"})

        }
    })
   res.send({message:"not a favourite to remove"})


}

module.exports = {
    GetUserCart,
    GetUserData,
    GetUserById,
    DeleteMovieFromCart,
    AddToFavourites,
    RemoveFromFavourites
}

