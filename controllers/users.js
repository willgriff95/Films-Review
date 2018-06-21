const User = require('../models/user');


function newUser(req, res) {
  console.log('inside newUser function');
  res.render('registrations/index');
}

// ---------------------------Create a new User account--------------------------

function createUser(req, res){
  console.log('you created a user');
  User
    .create(req.body)
    .then((user) => {
      req.session.userId = user._id;
      req.flash('successful', 'Sign up successful!');
      return res.redirect('/');
    })
    .catch((error) => {
      res.badRequest('signup', 'Your username or email is already taken.');
      res.badRequest('signup', error.toString());

    });
}

function showUser(req, res) {
  User
    .findById(req.params.id) // This is only usable because we have the body-parser
    .populate('user')
    .exec()
    .then(user => res.render('users/show', {user}))
    .catch(err => console.log(err));
}

function editUser(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => res.render('users/edit', { user }));
}

function updateUser(req, res) {
  console.log('hitting user update');


  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      user = Object.assign(user, req.body); // This assigns the contents of req.body to user
      return user.save();
    })
    .then(user => res.redirect(`/users/${user._id}`))
    .catch(err => console.log(err));
}

module.exports = {
  show: showUser,
  edit: editUser,
  update: updateUser,
  new: newUser,
  create: createUser
};
