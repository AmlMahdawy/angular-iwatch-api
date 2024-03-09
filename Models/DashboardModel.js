const validator = require('validator');
const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
    totalSales:{type:Number},
    usersCount:{type:Number},
    movieStatistics:[],
    totalReview:Number,
    totalMovies:Number
    

})
module.exports = mongoose.model("Dashboard",DashboardSchema);