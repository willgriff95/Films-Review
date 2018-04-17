const User = require('../models/user');

function showRoute(req, res) {
  User
    .findById(req.params.id) // This is only usable because we have the body-parser
    .populate('user')
    .exec()
    .then(user => res.render('users/show', {user}))
    .catch(err => console.log(err));
}

function editRoute(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => res.render('users/edit', { user }));
}

function updateRoute(req, res) {
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
  show: showRoute,
  edit: editRoute,
  update: updateRoute
};
