const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const routes = require('./config/routes');

const { port, dbURI } = require('./config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => console.log(`Express started on port: ${port}`));
