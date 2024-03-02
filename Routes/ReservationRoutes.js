const express = require("express");
const router = express.Router();
const ReservationsController= require("../Controllers/ReservationsController")





// filter routes

router.post("/cinema-name/dates",ReservationsController.GetCinemaDates)
router.post("/cinema-name/dates/movies",ReservationsController.GetCinemaMovies)
router.post("/cinema-name/dates/movies/times",ReservationsController.GetCinemaTimes)

//renders already reserved seats
router.get("/reserved-seats",ReservationsController.RenderSeats)

//reserve new seats (add to cart step)
router.post("/add/seats",ReservationsController.addSeatToCart)
//reserve new seats (payment step)
router.post("/check-out/seats",ReservationsController.CheckOut)







module.exports = router;