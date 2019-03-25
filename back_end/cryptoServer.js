const express        = require('express');//In order to use express to create simple framework
const MongoClient    = require('mongodb').MongoClient;//Used to create database for information to go to, online resource.
const bodyParser     = require('body-parser');//Used to correctly parse URLs
const db             = require('./config/db');//Used to link to the config of DataBase
const app            = express();//Server (APP) set to express
const hostname = '127.0.0.1';//Run IP
const http = require('https');//Protocol (Should be https)
var url = require('url'); //Get Urls
//var fs = require('fs');


// server.js, start port
const port = 8000;
//Parse URL
app.use(bodyParser.urlencoded({ extended: true }));


//Connect to MongoDB database.
MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes/cryptoIndex.js')(app, database);//Load routes to use functionality from other files (app._action)
	app.listen(port, hostname, () => { //start server
        console.log(`Server running at http://${hostname}:${port}/`);
    });               
})

//Default loading of page.
app.get('/',(request,response)=>{
 response.sendFile(__dirname + '/index.html');
});



/*
const server = http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  console.log(filename);
  filename = filename + ".html";
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }  
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/

