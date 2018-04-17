
const mongoose  = require('mongoose');
mongoose.Promise = require('bluebird');

const { databaseURI } = require('../config/environment');
mongoose.connect(databaseURI);

const Film = require('../models/film');

Film.collection.drop();

Film.create([{
  title: 'The Godfather',
  genre: 'Crime, Drama',
  year: 1972,
  photo: 'https://ia.media-imdb.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY209_CR3,0,140,209_AL_.jpg',
  rating: 9.2
},{
  title: 'The Shawshank Redemption',
  genre: 'Crime, Drama',
  year: 1994,
  photo: 'https://vignette.wikia.nocookie.net/cinemorgue/images/5/50/The-Shawshank-Redemption_poster_goldposter_com_48.jpg/revision/latest?cb=20161030023729',
  rating: 9.3
},{
  title: 'Forrest Gump',
  genre: 'Drama, Romance',
  year: 1994,
  photo: 'https://ia.media-imdb.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UY209_CR2,0,140,209_AL_.jpg',
  rating: 8.8
}])

  .then(films => console.log(`${films.length} created`))
  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
