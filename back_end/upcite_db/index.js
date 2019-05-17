const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const express = require('express');
const cors = require("cors");
const PORT = process.env.PORT || 3002;
const hostname = '127.0.0.1';//Run IP
const http = require('https');//Protocol (Should be https)
const url = require('url'); //Get Urls

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession(({
  secret: 'keyboard cat - REPLACE ME WITH A BETTER SECRET',
  resave: false,
  saveUninitialized: true,
})));


const controllers = require('./routes');
app.use(controllers)

app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`)
});
