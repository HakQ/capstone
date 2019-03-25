const express = require('express');//In order to use express to create simple framework
const bodyParser = require('body-parser');
const hostname = '127.0.0.1';
const http = require('http');
const https = require('https');
const app = express();
const querystring = require('querystring'); 
const port = 8000;
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
    

/*
function check_MAL_JSON(data){
    console.log(data.intent + "    " + typeOf(data.intent));
    console.log(data.intent == 'sale');
    if(data.intent != "sale"){
        return true;
        // || data.intent != "order" || data.itent != "authorize"
    }
    //if(ddata.
    return false;
}



var myCallback = async function(err, data) {
  err = check_MAL_JSON(data);
  if (err) throw err; // Check for the error and throw if it exists.
  paypal.payment.create(data, function (error, payment) {
    if (error) {
        throw error;
    } else {
        console.log("Create Payment Response:\n");
        console.log(payment);
    }
  });  
  console.log('got data: '+ data); // Otherwise proceed as usual.JSON.stringify(data, null, 4) 
};

    
async function setPayment(requiredData, myCallBack){
    var errState = (requiredData == null) ? null : false;
    const promise = await myCallBack(errState, requiredData);
    console.log("_After mycallback_ : " + requiredData);
    //var paymentLink = ;
    //console.log(
}
*/

//Tester for API (PayPal)
//setPayment(create_payment_json, myCallback);

/*const server = http.createServer(function (req, res) {
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

    

/*
curl -v -X POST https://api.sandbox.paypal.com/v2/payments/authorizations/0VF52814937998046/reauthorize \
-H "Content-Type: application/json" \
-H "Authorization: Bearer access_token$production$pnwhyppds3s3zwt7$835b427175954ae21fcb58b65a9f674e" \
-H "PayPal-Request-Id: 123e4567-e89b-12d3-a456-426655440040" \
-d '{
  "amount": {
    "value": "10.99",
    "currency_code": "USD"
  }
}'

*/


/*

var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://return.url",
        "cancel_url": "http://cancel.url"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item",
                "sku": "item",
                "price": "1.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
};
*/







