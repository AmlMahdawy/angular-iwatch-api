const express = require("express");
const router = express.Router();
const MoviesController= require("../Controllers/MoviesController")

router.get("/all",MoviesController.GetAllMovies)
router.post("/add-review",MoviesController.PostReview)





module.exports = router;