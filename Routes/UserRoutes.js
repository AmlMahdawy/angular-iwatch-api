const express = require("express");
const router = express.Router();
const UsersController= require("../Controllers/UsersController")


router.get("/cart",UsersController.GetUserCart)
router.get("/profile",UsersController.GetUserData)


module.exports = router;
