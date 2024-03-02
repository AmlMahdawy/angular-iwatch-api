const express = require("express");
const router = express.Router();
const ReservationsController= require("../Controllers/ReservationsController")





// filter routes

router.post("/cinema-name/dates",ReservationsController.GetCinemaDates)
router.post("/cinema-name/dates/movies",ReservationsController.GetCinemaMovies)
router.post("/cinema-name/dates/movies/times",ReservationsController.GetCinemaTimes)

// filter routes
// router.get("/movie-name",ReservationsController.MovieReservationDetails)

//renders already reserved seats
router.get("/reserved-seats",ReservationsController.RenderSeats)

//reserve new seats
router.post("/add/seats",ReservationsController.ReserveSeat)







module.exports = router;