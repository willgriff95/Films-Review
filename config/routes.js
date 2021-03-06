// -------------The route talks between the index and the controller-------------

// ---------------------Importing framework & controllers------------------------

const router = require('express').Router();
const films = require('../controllers/films');
// const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const users = require('../controllers/users');

// -------------------Only show content if user is signed in---------------------

function secureRoute(req, res, next){
  if(!req.session.userId){
    return req.session.regenerate(() =>{
      res.redirect('/signin');
      req.flash('danger', 'You must be logged in');
    });
  }
  return next();
}

// ----------------------------------Homepage------------------------------------

router.get('/', (req, res) => res.render('home'));

// -------------------------------Films Resource---------------------------------



router.route('/films')
  .get(films.index)
  .post(films.create);

router.route('/films/new')
  .get(secureRoute, films.new);

router.route('/films/:id') //Defining a dynamic segment: a part of the URL will change. This bit is sending the id we've navigated to to the controller. The ID is taken from index.ejs.
  .get(films.show)
  .delete(films.delete)
  .put(films.update);

router.route('/films/:id/edit')
  .get(films.edit);

// --------------------------End of films Resource-------------------------------


// -----------------------------Users Resource-----------------------------------


router.route('/users/:id') //Defining a dynamic segment: a part of the URL will change. This bit is sending the id we've navigated to to the controller. The ID is taken from index.ejs.
  .get(users.show)
  .put(users.update);
  // .delete(users.delete)

router.route('/users/:id/edit')
  .get(users.edit);


// ------------------------------------------------------------------------------

// -------------------------------Authentication---------------------------------

router.route('/signup')
  .get(users.new)
  .post(users.create);

router.route('/signin')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

//-----------------------------End authentication--------------------------------


//------------------------Error message for incorrect URL------------------------

// If any other url entered that doesn't route to one already existing then return an error message
router.route('/*').get((req, res) => {
  res.redirect('/'); //This renders the error on the homepage
  req.flash('danger', 'THE URL REQUESTED DOESN\'T EXIST');
  // res.render('statics/404.ejs');
});
//--------COMMENTS-------------------------------------------------------
router.post('/films/:id/reviews', secureRoute, films.commentNew);

router.route('/films/:id/reviews/:reviewId')
  .delete(films.commentDelete);
//------------------------------------------------------------------------------

module.exports = router;
