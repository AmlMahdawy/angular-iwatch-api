const express = require("express");
const router = express.Router();
const MoviesController= require("../Controllers/MoviesController")

router.get("/all",MoviesController.GetAllMovies)
router.get("/review-check",MoviesController.checkForUserReviews)
router.post("/add-review",MoviesController.PostReview)
router.get("/movie-name",MoviesController.GetMovieByName)





module.exports = router;