const cors = require("cors");
const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const config = require('./config');
const hostname = '127.0.0.1';//Run IP
const http = require('https');//Protocol (Should be https)
var url = require('url'); //Get Urls
const port = 3002;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());



app.listen(port, hostname, () => {});
require('./routes/get_info')(app);
// require("./routes/test")(app);
console.log('Server started on port')
