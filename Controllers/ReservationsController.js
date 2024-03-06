const ReseervationsModel = require('../Models/ReservationModel');
const AuthModel = require('../Models/AuthModel');
const AuthController = require("../Controllers/AuthController")
const UsersController = require("../Controllers/UsersController")
const MoviesModel = require('../Models/MoviesModel');







let MovieReservationDetails = async (req, res, next) => {
    let movie = req.body.movie
    let MatchedMovies = await ReseervationsModel.find({ "movie-name": movie }, { cinema: 1, date: 1, time: 1, _id: 0 })
    let cinemas = []
    let dates = []
    let times = []
    MatchedMovies.forEach((el) => {
        if (!cinemas.includes(el.cinema)) { cinemas.push(el.cinema) }





    })
    res.send({ cinemas: cinemas, dates: dates, times: times })


}

let GetCinemaDates = async (req, res, next) => {
    let cinemaName = req.body.cinema
    let movieName = req.body.movie
    let dates = await ReseervationsModel.find({ cinema: cinemaName, "movie-name": movieName }, { date: 1, _id: 0 })
    let uniqueDates = []
    dates.forEach((el) => {
        if (!uniqueDates.includes(el.date)) {
            uniqueDates.push(el.date)
        }
    })
    res.send(uniqueDates)
}


// let GetCinemaMovies = async (req, res, next) => {
//     let cinemaName = req.body.cinema
//     let Date = req.body.date
//     let movies = await ReseervationsModel.find({ cinema: cinemaName, date: Date }, { "movie-name": 1, _id: 0 })
//     let uniqueMovies = []
//     movies.forEach((el) => {
//         if (!uniqueMovies.includes(el["movie-name"])) {
//             uniqueMovies.push(el["movie-name"])
//         }
//     })
//     res.send(uniqueMovies)
// }
let GetCinemaTimes = async (req, res, next) => {
    let cinemaName = req.body.cinema
    let Date = req.body.date
    let movie = req.body.movie
    let times = await ReseervationsModel
        .find({
            cinema: cinemaName,
            date: Date,
            "movie-name": movie
        },
            {
                "time": 1,

                _id: 0
            })

    res.send(times)
}


let RenderSeats = async (req, res, next) => {
    let cinemaName = req.body.cinema
    let Date = req.body.date
    let Time = req.body.time
    let movie = req.body.movie


    let reservation = await ReseervationsModel.findOne({
        cinema: cinemaName,
        date: Date,
        time: +Time,
        "movie-name": movie
    })
    res.send(reservation.reserved)
}
let addSeatToCart = async (req, res, next) => {
    let cinemaName = req.body.cinema
    let Date = req.body.date
    let Time = req.body.time
    let movie = req.body.movie
    let reservationData = req.body.reserve

    let movieImg = await MoviesModel.findOne({ Title: movie })
    let userID = await AuthController.decodeToken(req)
    userCart = {
        cinema: cinemaName,
        date: Date,
        time: +Time,
        "movie-name": movie,
        "movie-img": movieImg.Poster,
        seats: reservationData

    }

    let user = await AuthModel.findOne({ _id: userID })


    user.cart.push(userCart)
    await user.save()
    res.send({message:"seats Added"})
}

let fromCartToPurchased = async (req) => {
    let userID = await AuthController.decodeToken(req)

    let user = await UsersController.GetUserById(userID)

    user.cart.forEach((movie) => {
        user.purchased.push(movie)
    })
    user.cart = []
    await user.save()
}
let CheckOut = async (req, res, next) => {

    let cart = req.body.cart
    cart.forEach(async (Moviereservation) => {
        let found = await ReseervationsModel.findOne({
            cinema: Moviereservation.cinema,
            date: Moviereservation.date,
            time: Moviereservation.time,
            "movie-name": Moviereservation["movie-name"]
        })
        Moviereservation.seats.forEach((seat) => {
            found.reserved.push(seat)
        })
        await found.save()
    })


    await fromCartToPurchased(req)

    res.send({ checkedOut: true })
}

module.exports = {
    GetCinemaDates,
    GetCinemaTimes,
    // GetCinemaMovies,
    CheckOut,
    RenderSeats,
    MovieReservationDetails,
    addSeatToCart
}
