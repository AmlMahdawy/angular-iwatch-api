const ReseervationsModel = require('../Models/ReservationModel');
const jwt = require('jsonwebtoken');



let MovieReservationDetails=async (req,res,next)=>{
    let movie=req.body.movie
    let MatchedMovies = await ReseervationsModel.find({ Title:movie }, { cinema: 1,date:1,time:1, _id: 0 })
    let cinemas=[]
    let dates=[]
    let times=[]
    MatchedMovies.forEach((el)=>{
      if(!cinemas.includes(el.cinema)){cinemas.push(el.cinema)}
      if(!dates.includes(el.date)){dates.push(el.date)}
      if(!times.includes(el.time)){times.push(el.time)}



      
    })
res.send({cinemas:cinemas,dates:dates,times:times})


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
    res.send(reservation)
}

let ReserveSeat= async(req, res, next)=>{
    let cinemaName = req.body.cinema
    let Date = req.body.date
    let Time = req.body.time
    let movie=req.body.movie
    let reservationData=req.body.reserve

    let token=req.header("Authorization")
    let userID= jwt.verify(token,"secret").id
    reservationData.push({userId:userID})
    
    let reservation = await ReseervationsModel.findOne({ 
        cinema:cinemaName,
        date:Date,
        time:+Time,
        "movie-name":movie 
   })
  //  reservation.reserved.
   reservation.reserved.push(reservationData)
   

    // reservationData.forEach((seat)=>{
    //   reservation.reserved.push(seat)
    // })
 await reservation.save()

  res.send(reservation)
}

module.exports = { ReserveSeat,RenderSeats,MovieReservationDetails}
