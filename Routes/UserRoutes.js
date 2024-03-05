const express = require("express");
const router = express.Router();
const UsersController= require("../Controllers/UsersController")


router.get("/cart",UsersController.GetUserCart)
router.get("/profile",UsersController.GetUserData)
router.delete("/delete-movie",UsersController.DeleteMovieFromCart)
router.post("/add-favourite",UsersController.AddToFavourites)
router.delete("/delete-favourite",UsersController.RemoveFromFavourites)



module.exports = router;
