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

      res.redirect('/films');
    });
}

// -------------------Controller (function) to create new film-------------------

function editRoute(req, res) {
  User
    .findById(req.params.id) // This is only usable because we have the body-parser
    // .populate('photos') // Why is this necessary here?
    .exec()
    .then(user => res.render('sessions/edit', {user}));
}


function deleteRoute(req, res) {
  console.log('you deleted a film');
  console.log(req.session);
  // res.render('films/index');
  return req.session.regenerate(() => res.render('films/index'));
}


// // -------------------Controller (function) to edit user-------------------------


module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute,
  edit: editRoute
};

// // --------------The controller talks between the router and the view------------
// // -------------The name of the file for a controller is always plural-----------
//
// // -----------------------------For the sign up----------------------------------
//
// const User = require('../models/user');
// // const flash = require('express-flash');
//
// function newRoute(req, res) {
//   res.render('registrations/index');
// }
//
// // ---------------------------Create a new User account--------------------------
//
// function createRoute(req, res){
//   console.log('you created a user');
//   User
//     .create(req.body)
//     .then((user) => {
//       req.session.userId = user._id;
//       req.flash('successful', 'Sign up successful!');
//       return res.redirect('/films');
//     })
//     .catch((error) => {
//       res.badRequest('signup', 'Your username or email is already taken.');
//       res.badRequest('signup', error.toString());
//
//     });
// }
//
// module.exports = {
//
// };
