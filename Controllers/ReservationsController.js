const ReseervationsModel = require('../Models/ReservationModel');
const jwt = require('jsonwebtoken');


let GetCinemaDates = async (req, res, next) => {
    let cinemaName = req.body.cinema
    let dates = await ReseervationsModel.find({ cinema: cinemaName }, { date: 1, _id: 0 })
    let uniqueDates = []
    dates.forEach((el) => {
        if (!uniqueDates.includes(el.date)) {
            uniqueDates.push(el.date)
        }
    })
    res.send(uniqueDates)
}


let GetCinemaMovies = async (req, res, next) => {
    let cinemaName = req.body.cinema
    let Date = req.body.date
    let movies = await ReseervationsModel.find({ cinema: cinemaName, date: Date }, { "movie-name": 1, _id: 0 })
    let uniqueMovies = []
    movies.forEach((el) => {
        if (!uniqueMovies.includes(el["movie-name"])) {
            uniqueMovies.push(el["movie-name"])
        }
    })
    res.send(uniqueMovies)
}
let GetCinemaTimes = async (req, res, next) => {
    let cinemaName = req.body.cinema
    let Date = req.body.date
    let movie=req.body.movie
    let times = await ReseervationsModel
    .find({ 
        cinema: cinemaName,
         date: Date ,
         "movie-name":movie},
          { "time": 1,
          reserved:1, 
          _id: 0 })
 
    res.send(times)
}


let RenderSeats=async(req,res,next)=>{
    let cinemaName = req.body.cinema
    let Date = req.body.date
    let Time = req.body.time
    let movie=req.body.movie



    let reservation = await ReseervationsModel.findOne({ 
        cinema:cinemaName,
        date:Date,
        time:+Time,
        "movie-name":movie 
   })
    res.send(reservation.reserved)
}

let ReserveSeat= async(req, res, next)=>{
    let cinemaName = req.body.cinema
    let Date = req.body.date
    let Time = req.body.time
    let movie=req.body.movie
    let reservationData=req.body.reserve

    let token=req.header("Authorization")
    let userID= jwt.verify(token,"secret").id
    
    let reservation = await ReseervationsModel.findOne({ 
        cinema:cinemaName,
        date:Date,
        time:+Time,
        "movie-name":movie 
   })
   

    reservationData.forEach((seat)=>{
        seat.userId=userID
      reservation.reserved.push(seat)
    })
 await reservation.save()

  res.send(reservation)
}

module.exports = { GetCinemaDates, GetCinemaTimes,GetCinemaMovies ,ReserveSeat,RenderSeats}
