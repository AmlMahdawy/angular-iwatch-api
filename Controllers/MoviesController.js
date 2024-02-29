const MoviesModel = require('../Models/MoviesModel');
const jwt = require('jsonwebtoken');


let checkForUserReviews = async (req, res, next) => {
  let token = req.header("Authorization")
  let userID = jwt.verify(token, "secret").id
  let movie = await MoviesModel.findOne({ Title: req.body.movieName })
  let found = movie.Reviews.find((ele) => {
    return ele.userId == userID
  })
  if (found) {
    res.send({ reviewed: true })

  } else {
    res.send({ reviewed: false })

  }


}

let GetAllMovies = async (req, res, next) => {
  let Movies = await MoviesModel.find({})
  res.status(200).send(Movies)

}

let GetMovieByName = async (req, res, next) => {
  let movie = await MoviesModel.findOne({ Title: req.body.movieName })
  res.send(movie)
}

let PostReview = async (req, res, next) => {

  review = req.body.review
  let token = req.header("Authorization")
  let userID = jwt.verify(token, "secret").id
  review.userId = userID
  let movie = await MoviesModel.findOne({ Title: req.body.movieName })
  movie.Reviews.push(review)
  await movie.save()
  res.status(200).send({ message: "review added" })




}


module.exports = { GetAllMovies, PostReview, GetMovieByName, checkForUserReviews }