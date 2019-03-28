const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const cors = require("cors");
const hostname = '127.0.0.1';
const port = 3003;
var url = require('url');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());


app.listen(port, hostname, ()=> {
  mongoose.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true , autoIndex: true }
  );
});

const db = mongoose.connection;

db.on('error',(err)=> console.log(err));

db.once('open',()=>{
  require('./routes/retrieve')(app);
  console.log('Server started on port',config.PORT);
});
