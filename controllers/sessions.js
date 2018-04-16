// --------------The controller talks between the router and the view------------
// -------------The name of the file for a controller is always plural-----------

// -------------------------------For signin-------------------------------------

// --------------------------Importing the user model----------------------------

const User = require('../models/user');

// ---------------------Create a new route for sessions--------------------------

function newRoute(req, res) {
  res.render('sessions/index');
}

// ---------------------Create a new route for sessions--------------------------

function createRoute(req, res) {
  User
    .findOne({email: req.body.email})
    .then((user) =>{
      console.log(user);
      if(!user || !user.validatePassword(req.body.password)){
        req.flash('danger', 'Email or password is incorrect');
        res.status(401).render('sessions/index', {message: 'Wrong credentials'});
      }
      req.session.userId = user.id;
      console.log(req.session);

      res.redirect('/');
    });
}

function deleteRoute(req, res) {
  return req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
