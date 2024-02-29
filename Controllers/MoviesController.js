const MoviesModel = require('../Models/MoviesModel');
const jwt = require('jsonwebtoken');


let GetAllMovies = async (req, res, next) => {
  let Movies = await MoviesModel.find({})
  res.status(200).send(Movies)

}
let PostReview = async (req, res, next) => {
  review = req.body.review
  let token = req.header("Authorization")
  let userID = jwt.verify(token, "secret").id
  review.userId = userID
  let movie = await MoviesModel.findOne({ Title: req.body.movieName })
  movie.Reviews.push(review)
  res.status(200).send(movie)

}


module.exports = { GetAllMovies, PostReview }