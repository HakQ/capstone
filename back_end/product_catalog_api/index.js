//const restify = require('restify');
const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const config = require('./config');
const hostname = '127.0.0.1';//Run IP
const http = require('https');//Protocol (Should be https)
var url = require('url'); //Get Urls
const port = 3001;
//const server = restify.createServer();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Middle ware
//server.use(restify.plugins.bodyParser());

app.listen(port, hostname, () => { //start server
  console.log(`Server running at http://${hostname}:${port}/`);
  mongoose.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true , autoIndex: true }
  );
});

const db = mongoose.connection;

db.on('error',(err)=> console.log(err));

db.once('open',()=>{
  require('./routes/catalog')(app);
  console.log('Server started on port',config.PORT);
});
