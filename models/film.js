// The name of the file for a model is always singular

const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: {type: String, required: true},
  genre: String,
  year: Date,
  photo: String,
  rating: {type: Number, min: 1, max: 10, default: 3}
});

module.exports = mongoose.model('Film', filmSchema);
