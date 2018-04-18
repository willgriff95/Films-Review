// The name of the file for a model is always singular

const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
//-----------------------------------------------------------------------------
  content: String,
  rating: Number,
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

//-----------------------------------------------------------------------------

const filmSchema = new mongoose.Schema({
  title: {type: String, required: true},
  genre: {type: String, required: true},
  // year: String,
  photo: String,
  backgroundImage: String,
  rating: {type: Number, min: 1, max: 10, default: 3},
  reviews: [reviewSchema],
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}

});

module.exports = mongoose.model('Film', filmSchema);
