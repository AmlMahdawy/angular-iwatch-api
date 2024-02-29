const express = require("express");
const router = express.Router();
const ReservationsController= require("../Controllers/ReservationsController")




// filter routes

router.get("/movie-name",ReservationsController.MovieReservationDetails)

//renders already reserved seats
router.get("/reserved-seats",ReservationsController.RenderSeats)

//reserve new seats
router.post("/add/seats",ReservationsController.ReserveSeat)







module.exports = router;