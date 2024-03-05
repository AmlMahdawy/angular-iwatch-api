const MoviesModel = require('../Models/MoviesModel');
const jwt = require('jsonwebtoken');
const AuthController=require("./AuthController")

let checkForUserReviews = async (req, res, next) => {
  let token = req.header("Authorization")
  let userID = jwt.verify(token, "secret").id
 
  let movie = await MoviesModel.findOne({ Title: req.body.movie })
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
  let movie = await MoviesModel.findOne({ Title: req.body.movie })
  res.send(movie)
}

let PostReview = async (req, res, next) => {
  reviewx = req.body.review
  let userID = await AuthController.decodeToken(req)
  reviewx.userId = userID
  let movie = await MoviesModel.findOne({ Title: req.body.movie })
  movie.Reviews.push(reviewx)
  await movie.save()
  res.status(200).send({ message: "review added" })
}
let GetMovieReviews=async (req, res, next) => {
 
  let reviews = await MoviesModel.findOne({ Title: req.body.movie },{Reviews:1,_id:0})

  res.status(200).send(reviews.Reviews)
}


module.exports = { GetAllMovies, PostReview, GetMovieByName, checkForUserReviews,GetMovieReviews }