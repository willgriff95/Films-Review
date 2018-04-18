
const mongoose  = require('mongoose');
mongoose.Promise = require('bluebird');

const { databaseURI } = require('../config/environment');
mongoose.connect(databaseURI);

const Film = require('../models/film');
const User = require('../models/user');


User.collection.drop();
Film.collection.drop();


User
  .create([
    {
      username: 'Will',
      email: 'a@a',
      photo: 'https://i.imgur.com/3embnlD.jpg',
      password: 'a',
      passwordConfirmation: 'a'
    },
    {
      username: 'Matt',
      email: 'b@b',
      photo: 'https://i.imgur.com/nNuTtsL.png',
      password: 'b',
      passwordConfirmation: 'b'
    },
    {
      username: 'James',
      email: 'c@c',
      photo: '',
      password: 'c',
      passwordConfirmation: 'c'
    }
  ])
  .then(users => {
    console.log(`${users.length} users were created!`);

    return Film.create([{
      title: 'The Godfather',
      genre: 'Crime, Drama',
      year: 1972,
      photo: 'https://ia.media-imdb.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY209_CR3,0,140,209_AL_.jpg',
      rating: 9.2,
      user: users[0]._id
    },{
      title: 'The Shawshank Redemption',
      genre: 'Crime, Drama',
      year: 1994,
      photo: 'https://vignette.wikia.nocookie.net/cinemorgue/images/5/50/The-Shawshank-Redemption_poster_goldposter_com_48.jpg/revision/latest?cb=20161030023729',
      rating: 9.3,
      user: users[1]._id
    },{
      title: 'Forrest Gump',
      genre: 'Drama, Romance',
      year: 1994,
      photo: 'https://ia.media-imdb.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UY209_CR2,0,140,209_AL_.jpg',
      rating: 8.8,
      user: users[1]._id
    }]);
  })
  .then(films => console.log(`${films.length} created`))
  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
