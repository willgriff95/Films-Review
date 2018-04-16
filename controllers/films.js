// --------------The controller talks between the router and the view------------
// -------------The name of the file for a controller is always plural-----------

const Film = require('../models/film');
function filmsIndex(req, res){
  Film
    .find()
    .populate('user')
    .exec() // Everything before .exec() won't be executed until .exec()
    .then(films => {
      res.render('films/index', {films});
    });
  // There is no .finally() here, because the connection to node.js is always open
}

// ---------------------Controller (function) to show page-----------------------

function filmsShow(req, res){
  Film
    .findById(req.params.id) // This is only usable because we have the body-parser
    .populate('photos')
    .exec()
    .then(film => res.render('films/show', {film}));
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
        return res.badRequest('/films/new', error.toString()); // Must be returned
      }
    });
}

// -------------------Controller (function) to create new film-------------------

function filmsEdit(req, res) {
  Film
    .findById(req.params.id) // This is only usable because we have the body-parser
    .populate('photos') // Why is this necessary here?
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

function filmsDelete(req, res){
  Film
    .findById(req.params.id)
    .exec()
    .then(film => film.remove())
    .then(() => res.redirect('/films'));
}

// ------Exporting all the controllers so they can communicate in the routes-----

module.exports = {
  index: filmsIndex,
  show: filmsShow,
  delete: filmsDelete,
  new: filmsNew,
  create: filmsCreate,
  edit: filmsEdit,
  update: filmsUpdate
};
