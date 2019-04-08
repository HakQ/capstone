const express = require('express');//In order to use express to create simple framework
const bodyParser = require('body-parser');
const hostname = '127.0.0.1';
const http = require('http');
const https = require('https');
const app = express();
const querystring = require('querystring'); 
const port = 8001;
var url = require('url'); 
var paypal = require('paypal-rest-sdk');
var fs = require('fs');
var paypalAPI = require("./Utilities/apiFunctions.js");
var request = require('request');
var authKey; 
var paypal_client_id = 'AW3ZFvNBLp0K92uNCALK2NTBYeaPplZgFfZpsMoQaX-ftgiia2US3ZaXicpm064A2z1p5tJezt8fD7l6';
var paypal_client_secret = 'EA8nIoVPZHQDYVq_BuoZBKetkmGimeqZo5HQsDO6n9OnZPe5d6n52ts-CSepROPhur7D2h_C69yQjj__';


function typeOf(obj) {
  return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
}

//PayPal   Capstone ECommerce App Hunter CS
//Account: francisxirizarryprogramming@gmail.com
//AccessToken: access_token$production$pnwhyppds3s3zwt7$835b427175954ae21fcb58b65a9f674e
//Expire Date: 17 Mar 2029

//Sandbox account: francisxirizarryprogramming-facilitator@gmail.com
//Client ID: AW3ZFvNBLp0K92uNCALK2NTBYeaPplZgFfZpsMoQaX-ftgiia2US3ZaXicpm064A2z1p5tJezt8fD7l6
//Secret: EA8nIoVPZHQDYVq_BuoZBKetkmGimeqZo5HQsDO6n9OnZPe5d6n52ts-CSepROPhur7D2h_C69yQjj__







paypal.configure({
  mode: 'sandbox', // Sandbox or live
  client_id: paypal_client_id,
  client_secret: paypal_client_secret});
  
  
//var auth = 'Basic ' + Buffer.from(paypal_client_id + ':' + paypal_client_secret).toString('base64');


var headersGet = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + authKey
};

var optionsGet = {
    url: 'https://api.sandbox.paypal.com/v1/payment-experience/web-profiles/XP-8YTH-NNP3-WSVN-3C76',
    headers: headersGet
};

function callbackGet(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(JSON.stringify(JSON.parse(body), null, 4));
    }
}

request(optionsGet, callbackGet);




  
  


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./app/routes/Paypal_routes.js')(app);//Load routes to use functionality from other files (app._action)
app.listen(port, hostname, () => { //start server
    console.log(`Server running at http://${hostname}:${port}/`);
}); 
    


    



