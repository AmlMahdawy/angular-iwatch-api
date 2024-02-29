const express = require("express");
const router = express.Router();
const ReservationsController= require("../Controllers/ReservationsController")




// filter routes

router.post("/cinema-name/dates",ReservationsController.GetCinemaDates)
router.post("/cinema-name/dates/movies",ReservationsController.GetCinemaMovies)
router.post("/cinema-name/dates/movies/times",ReservationsController.GetCinemaTimes)


//renders already reserved seats
router.post("/reserved-seats",ReservationsController.RenderSeats)

//reserve new seats
router.post("/add/seats",ReservationsController.ReserveSeat)







module.exports = router;