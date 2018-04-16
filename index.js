const express = require('express'); // import express
const app = express(); // store the express() function in app
const bodyParser = require('body-parser'); //Included for dynamic segments in URLs
const methodOverride = require('method-override'); // Import the methodOverride (for using the _method on Internet Explorer)
const morgan = require('morgan'); //Import Morgan for displaying error messages
const expressLayouts = require('express-ejs-layouts'); //EJS layouts
const mongoose = require('mongoose'); //Import mongoose
const flash = require('express-flash');
const session = require('express-session');

const User = require('./models/user');
const {port, databaseURI} = require('./config/environment');
// THIS IS THE EQUIVALENT OF WRITING
// const port = require('./config/environment').port;
// const databaseURI = require('./config/environment').databaseURI;
// const customResponses = require('./lib/customResponses'); // Import the custom responses
const routes = require('./config/routes'); // Using the routes file

mongoose.connect(databaseURI); // Connecting Mongoose to the URL of the database we want to use

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

app.use(morgan('dev'));
app.use(expressLayouts);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(req => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: 'my super secret token',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
// app.use(customResponses);

app.use((req, res, next) =>{
  if(!req.session.userId) return next();

  User
    .findById(req.session.userId)
    .then((user) =>{
      req.session.userId = user._id;
      res.locals.user = user;
      req.currentUser = user;
      res.locals.isLoggedIn = true;
      next();
    });
// res contains locals, locals contains user because we put it there.

});

app.use(routes); // Using the routes as a middleware

app.use((err, req, res, next) => { //This whole thing will only be run if err is true.
  err.status = err.status || 500; //"If anything happens to the server that is handled by express, use err.status. If express is not giving any status for the error, use 500 (internal server error)"
  err.message = err.message || 'Internal Server Error';
  res.status(err.status); //Setting the actual response status
  res.locals.err = err; //Putting err into the locals object to transfer it to the view
  return res.render(`statics/${err.status}`); //In the statics folder, render a different file per error
});

app.listen(port, () => console.log(`Running on port${port}`));
