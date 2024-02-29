const mongoose = require('mongoose');
const ReservationSchema = new mongoose.Schema({
     cinema: { type: String },
     date: {type: String },
     time:{type:String},
    "movie-name": { type: String },
     reserved: { type: Array }

})
module.exports = mongoose.model("reservation", ReservationSchema);