var http = require("http");
var request = require('request');
var jsonFunc = require("/home/tuxschool/Mern Setup/getJSON.js");
const querystring = require('querystring');    
function typeOf(obj) {
  return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
}

//127.0.0.1:8000/notes (Postman Post)
//
//Test Get Of Server
var optionsGet = {
  host: '127.0.0.1',
  port: 8000,
  path: '/notes/5c8ca278b84dca11e42671c0/kittylover12@12',//5c8ca278b84dca11e42671c0/kittylover12@12
  method: 'GET'
};

//Test Post 
var myJSONObject = querystring.stringify({ User: 'tuxwonder7', Pass: 'kittyLover123' });
var optionsPost = {
  host: '127.0.0.1',
  port: 8000,
  path: '/notes',//5c8ca278b84dca11e42671c0/kittylover12@12
  User: 'tuxwonder7',
  headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       'Content-Length': myJSONObject.length
  },
  //body: JSON.stringify(myJSONObject),// { User: 'tuxwonder7', Pass: 'kittyLover123', KeyPass: 'Random' },
  method: 'POST'
};

//Send Get Request, parse data, return data.
var req = http.request(optionsGet, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers, null, 4));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    //console.log(typeOf(chunk));
    //var partsOfStr = chunk.replace(',', '\n');
    //chunk = chunk.replace(/,/g,'\n');
    chunk = chunk.replace('{', '\n{');
    //chunk = chunk.replace('}', '\n}');
    console.log('BODY: ' +  chunk + '\n');
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.end(); //End request

//Create Post request
var reqPost = http.request(optionsPost, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers, null, 4));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    //console.log(typeOf(chunk));
    //var partsOfStr = chunk.replace(',', '\n');
    //chunk = chunk.replace(/,/g,'\n');
    chunk = chunk.replace('{', '\n{');
    //chunk = chunk.replace('}', '\n}');
    console.log('SUCCESS BODY: ' +  chunk + '\n');
  });
});

reqPost.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
//Write Post request data, if this is not here you will not send any relevant data to the post. 
reqPost.write(myJSONObject);
reqPost.end();





    
/*var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.write('data\n');
req.write('data\n');
req.end();*/
