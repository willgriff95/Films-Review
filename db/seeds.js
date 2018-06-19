
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
      photo: 'https://i.imgur.com/QUIA9rO.jpg',
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
      title: 'Hacksaw Ridge',
      genre: ' Biography, Drama, History',
      year: 1972,
      director: 'Mel Gibson',
      writers: ' Robert Schenkkan (screenplay by), Andrew Knight (screenplay by)',
      trailer: 'https://www.youtube.com/embed/s2-1hz1juBI?rel=0&amp;controls=0&amp;showinfo=0',
      stars: ' Andrew Garfield, Sam Worthington, Luke Bracey',
      photo: 'http://motcreative.com/wp-content/uploads/2017/08/HACKSAWRIDGE_MOTCREATIVE_3.jpg',
      backgroundImage: 'https://cdn-images-1.medium.com/max/2000/1*bCoe4NCb7l4Jq07Akue7jg.jpeg',
      rating: 9.2,
      user: users[0]._id
    },{
      title: 'Gravity',
      genre: 'Drama, Sci-Fi, Thriller' ,
      year: 1994,
      director: 'Alfonso Cuarón',
      writers: 'Alfonso Cuarón, Jonás Cuarón',
      trailer: 'https://www.youtube.com/embed/OiTiKOy59o4?rel=0&amp;controls=0&amp;showinfo=0',
      stars: 'Sandra Bullock, George Clooney, Ed Harris',
      photo: 'https://www.skip.at/media/_versions/filme/16053/poster_zoom.jpg',
      backgroundImage: 'http://www.kinocast.net/wp-content/uploads/2013/09/gravity-film-poster-deutsch-wallpaper-download.jpg',
      rating: 9.3,
      user: users[1]._id
    },{
      title: 'Inception',
      genre: 'Action, Adventure, Sci-Fi' ,
      year: 1994,
      director: 'Christopher Nolan',
      writers: 'Christopher Nolan',
      trailer: 'https://www.youtube.com/embed/YoHD9XEInc0?rel=0&amp;controls=0&amp;showinfo=0',
      stars: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
      photo: 'https://i.pinimg.com/originals/6e/25/74/6e25742131f52262b73d020e3f6c2ab2.jpg',
      backgroundImage: 'http://11points.com/wp-content/uploads/2010/07/inception-1600.jpg',
      rating: 9.3,
      user: users[1]._id
    },{
      title: 'Harry Potter',
      genre: 'Adventure, Drama, Fantasy' ,
      year: 1994,
      director: 'David Yates',
      writers: 'Steve Kloves (screenplay), J.K. Rowling (novel)',
      trailer: 'https://www.youtube.com/embed/mObK5XD8udk?rel=0&amp;controls=0&amp;showinfo=0',
      stars: 'Daniel Radcliffe, Emma Watson, Rupert Grint',
      photo: 'http://www.theemint.com/wp-content/uploads/2016/09/harry-potter-and-the-deathly-hallows-part-2-54f872ea2397b.jpg',
      backgroundImage: 'https://vignette.wikia.nocookie.net/harrypotter/images/a/a1/Harry-Potter-and-The-Deathly-Hallows-Part-2-Wallpapers-3.jpg/revision/latest?cb=20120102111518',
      rating: 9.3,
      user: users[1]._id
    },{
      title: 'Gravity',
      genre: 'Drama, Sci-Fi, Thriller' ,
      year: 1994,
      director: 'Alfonso Cuarón',
      writers: 'Alfonso Cuarón, Jonás Cuarón',
      trailer: 'https://www.youtube.com/embed/OiTiKOy59o4?rel=0&amp;controls=0&amp;showinfo=0',
      stars: 'Sandra Bullock, George Clooney, Ed Harris',
      photo: 'https://www.skip.at/media/_versions/filme/16053/poster_zoom.jpg',
      backgroundImage: 'http://www.kinocast.net/wp-content/uploads/2013/09/gravity-film-poster-deutsch-wallpaper-download.jpg',
      rating: 9.3,
      user: users[1]._id
    },{
      title: 'Inception',
      genre: 'Action, Adventure, Sci-Fi' ,
      year: 1994,
      director: 'Christopher Nolan',
      writers: 'Christopher Nolan',
      trailer: 'https://www.youtube.com/embed/YoHD9XEInc0?rel=0&amp;controls=0&amp;showinfo=0',
      stars: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
      photo: 'https://i.pinimg.com/originals/6e/25/74/6e25742131f52262b73d020e3f6c2ab2.jpg',
      backgroundImage: 'http://11points.com/wp-content/uploads/2010/07/inception-1600.jpg',
      rating: 9.3,
      user: users[1]._id
    },{
      title: 'Harry Potter',
      genre: 'Adventure, Drama, Fantasy' ,
      year: 1994,
      director: 'David Yates',
      writers: 'Steve Kloves (screenplay), J.K. Rowling (novel)',
      trailer: 'https://www.youtube.com/embed/mObK5XD8udk?rel=0&amp;controls=0&amp;showinfo=0',
      stars: 'Daniel Radcliffe, Emma Watson, Rupert Grint',
      photo: 'http://www.theemint.com/wp-content/uploads/2016/09/harry-potter-and-the-deathly-hallows-part-2-54f872ea2397b.jpg',
      backgroundImage: 'https://vignette.wikia.nocookie.net/harrypotter/images/a/a1/Harry-Potter-and-The-Deathly-Hallows-Part-2-Wallpapers-3.jpg/revision/latest?cb=20120102111518',
      rating: 9.3,
      user: users[1]._id
    },{
      title: 'Gravity',
      genre: 'Drama, Sci-Fi, Thriller' ,
      year: 1994,
      director: 'Alfonso Cuarón',
      writers: 'Alfonso Cuarón, Jonás Cuarón',
      trailer: 'https://www.youtube.com/embed/OiTiKOy59o4?rel=0&amp;controls=0&amp;showinfo=0',
      stars: 'Sandra Bullock, George Clooney, Ed Harris',
      photo: 'https://www.skip.at/media/_versions/filme/16053/poster_zoom.jpg',
      backgroundImage: 'http://www.kinocast.net/wp-content/uploads/2013/09/gravity-film-poster-deutsch-wallpaper-download.jpg',
      rating: 9.3,
      user: users[1]._id
    },{
      title: 'Inception',
      genre: 'Action, Adventure, Sci-Fi' ,
      year: 1994,
      director: 'Christopher Nolan',
      writers: 'Christopher Nolan',
      trailer: 'https://www.youtube.com/embed/YoHD9XEInc0?rel=0&amp;controls=0&amp;showinfo=0',
      stars: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
      photo: 'https://i.pinimg.com/originals/6e/25/74/6e25742131f52262b73d020e3f6c2ab2.jpg',
      backgroundImage: 'http://11points.com/wp-content/uploads/2010/07/inception-1600.jpg',
      rating: 9.3,
      user: users[1]._id
    },{
      title: 'Harry Potter',
      genre: 'Adventure, Drama, Fantasy' ,
      year: 1994,
      director: 'David Yates',
      writers: 'Steve Kloves (screenplay), J.K. Rowling (novel)',
      trailer: 'https://www.youtube.com/embed/mObK5XD8udk?rel=0&amp;controls=0&amp;showinfo=0',
      stars: 'Daniel Radcliffe, Emma Watson, Rupert Grint',
      photo: 'http://www.theemint.com/wp-content/uploads/2016/09/harry-potter-and-the-deathly-hallows-part-2-54f872ea2397b.jpg',
      backgroundImage: 'https://vignette.wikia.nocookie.net/harrypotter/images/a/a1/Harry-Potter-and-The-Deathly-Hallows-Part-2-Wallpapers-3.jpg/revision/latest?cb=20120102111518',
      rating: 9.3,
      user: users[1]._id
    },{
      title: 'Gravity',
      genre: 'Drama, Sci-Fi, Thriller' ,
      year: 1994,
      director: 'Alfonso Cuarón',
      writers: 'Alfonso Cuarón, Jonás Cuarón',
      trailer: 'https://www.youtube.com/embed/OiTiKOy59o4?rel=0&amp;controls=0&amp;showinfo=0',
      stars: 'Sandra Bullock, George Clooney, Ed Harris',
      photo: 'https://www.skip.at/media/_versions/filme/16053/poster_zoom.jpg',
      backgroundImage: 'http://www.kinocast.net/wp-content/uploads/2013/09/gravity-film-poster-deutsch-wallpaper-download.jpg',
      rating: 9.3,
      user: users[1]._id
    },{
      title: 'Inception',
      genre: 'Action, Adventure, Sci-Fi' ,
      year: 1994,
      director: 'Christopher Nolan',
      writers: 'Christopher Nolan',
      trailer: 'https://www.youtube.com/embed/YoHD9XEInc0?rel=0&amp;controls=0&amp;showinfo=0',
      stars: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
      photo: 'https://i.pinimg.com/originals/6e/25/74/6e25742131f52262b73d020e3f6c2ab2.jpg',
      backgroundImage: 'http://11points.com/wp-content/uploads/2010/07/inception-1600.jpg',
      rating: 9.3,
      user: users[1]._id
    },{
      title: 'Harry Potter',
      genre: 'Adventure, Drama, Fantasy' ,
      year: 1994,
      director: 'David Yates',
      writers: 'Steve Kloves (screenplay), J.K. Rowling (novel)',
      trailer: 'https://www.youtube.com/embed/mObK5XD8udk?rel=0&amp;controls=0&amp;showinfo=0',
      stars: 'Daniel Radcliffe, Emma Watson, Rupert Grint',
      photo: 'http://www.theemint.com/wp-content/uploads/2016/09/harry-potter-and-the-deathly-hallows-part-2-54f872ea2397b.jpg',
      backgroundImage: 'https://vignette.wikia.nocookie.net/harrypotter/images/a/a1/Harry-Potter-and-The-Deathly-Hallows-Part-2-Wallpapers-3.jpg/revision/latest?cb=20120102111518',
      rating: 9.3,
      user: users[1]._id
    },{
      title: 'Interstellar',
      genre: 'Adventure, Drama, Sci-Fi ',
      year: 14,
      director: 'Christopher Nolan',
      writers: 'Jonathan Nolan, Christopher Nolan',
      trailer: 'https://www.youtube.com/embed/zSWdZVtXT7E?rel=0&amp;controls=0&amp;showinfo=0',
      stars: ' Matthew McConaughey, Anne Hathaway, Jessica Chastain',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6wkG8fuKuICeKIJVwPTaeX4PXtoDWl9OL8nyXrGkQ7KwoMRW2Yg',
      backgroundImage: 'https://altright.com/wp-content/uploads/2017/12/interstellar-1400x700.jpg',
      rating: 9.3,
      user: users[1]._id
    }]);
  })
  .then(films => console.log(`${films.length} created`))
  .catch(err => console.log(err))
  .finally(()=> mongoose.connection.close());
