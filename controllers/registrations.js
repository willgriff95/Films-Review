// --------------The controller talks between the router and the view------------
// -------------The name of the file for a controller is always plural-----------

// -----------------------------For the sign up----------------------------------

const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/index');
}

// ---------------------------Create a new User account--------------------------

function createRoute(req, res){
  User
    .create(req.body)
    .then(() => {
      res.redirect('/');
    })
    // --If the entered fields are not the same as the model then throw an error-
    .catch((err) => {
      if(err.name === 'ValidationError'){ //This is just what mongodb calls a validation error - if the stuff the user input does not match the criteria set out in the model.
        return res.status(400).render('registrations/index', {message: err.toString()});
      }
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};