// --------------The controller talks between the router and the view------------
// -------------The name of the file for a controller is always plural-----------

const Film = require('../models/film');


function filmsIndex(req, res) {
  Film
    .find()
    .populate('user')
    .exec()
    .then(films => res.render('films/index', { films }))
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
}

// ---------------------Controller (function) to show page-----------------------

function filmsShow(req, res){
  Film
    .findById(req.params.id) // This is only usable because we have the body-parser
    .populate('user reviews.user')
    .exec()
    .then(film => res.render('films/show', {film}))
    .catch(err => console.log(err));
}

// --------------Controller (function) to show the new film page-----------------

function filmsNew(req, res){
  res.render('films/new', {error: null}); // This doesn't need a slash because it automatically goes to views/films/new
  // There is an empty error object here, so it can be passed to filmsCreate
}

// -------------------Controller (function) to create new film-------------------

function filmsCreate(req, res) {
  req.body.user = req.currentUser; //This could also be req.locals.user, which is defined also to be user in index.js
  console.log(req.body + 'created'); // This logs the contents of the request
  Film
    .create(req.body) // Getting the entire object of the request
    .then(() => res.redirect('/films')) // A promise is either fulfilled or not fulfilled. If it is not fulfilled, it will move onto .catch(). If it is fulfilled, it will move to the next .then()
    .catch((error) => { // Catches the validation error.
      if(error.name === 'ValidationError') {
        return res.BadRequest('/films/new', error.toString()); // Must be returned
      }
    });
}

// -------------------Controller (function) to create new film-------------------

function filmsEdit(req, res) {
  Film
    .findById(req.params.id) // This is only usable because we have the body-parser

    // .populate('photos') // Why is this necessary here?
    .exec()
    .then(film => res.render('films/edit', {film}));
}

// -----------------------Controller (function) to update film-------------------

function filmsUpdate(req, res){
  Film
    .findById(req.params.id)
    .exec()
    .then(film => {
      film = Object.assign(film, req.body); // This assigns the contents of req.body to film
      return film.save();
    })
    .then(film => res.redirect(`/films/${film._id}`));
}

// -----------------------Controller (function) to delete film-------------------

function filmsDelete(req, res) {
  Film
    .findById(req.params.id)
    .exec()
    .then(film => {
      if(!film) return res.sendStatus(404);
      return film.remove();
    })
    .then(() => res.redirect('/films'))
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
}


//----------TV Review SHOW------------------------------------------------------
function reviewCreate(req, res){
  Film
    .findById(req.params.id)
    .exec()
    .then(film => {
      req.body.user = req.currentUser;
      film.reviews.push(req.body);
      return film.save();
    })
    .then(film => {
      res.redirect(`/films/${film.id}`);
    })
    .catch(err => {
      console.log('inside catch',err);
      return res.sendStatus(500);
    });
}
//----------TV Review DELETE----------------------------------------------------
function reviewDelete(req, res) {
  Film
    .findById(req.params.id)
    .exec()
    .then(film => {
      console.log(film);
      const review = film.reviews.id(req.params.reviewId);
      review.remove();
      return film.save();
    })
    .then(film => res.redirect(`/films/${film._id}`));
}
//----

// ------Exporting all the controllers so they can communicate in the routes-----

module.exports = {
  index: filmsIndex,
  show: filmsShow,
  delete: filmsDelete,
  new: filmsNew,
  create: filmsCreate,
  edit: filmsEdit,
  update: filmsUpdate,
  commentNew: reviewCreate,
  commentDelete: reviewDelete
};
