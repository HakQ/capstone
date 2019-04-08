var request = require('request');

var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer A21AAHxZrYhjNgJu171SZCxo7r656RRPQrVZ2ZAzrJ9NDdWsUrAluuAlLE98WFEX1tMDiKSz3RYUWu-ENlyHaBb8V1K8Mqz9Q'
};

var options = {
    url: 'https://api.sandbox.paypal.com/v1/payment-experience/web-profiles/XP-8YTH-NNP3-WSVN-3C76',
    headers: headers
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        //console.log("Ya boii");
        console.log(body);
    }
    else{
    console.log(error);
    console.log(response.statusCode);
    }
}

request(options, callback);



var options = { method: 'POST',
  url: 'http://127.0.0.1:8001/payment',
  headers: 
   { 
     'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: 
   { intent: 'sale',
     payer: { payment_method: 'paypal' },
     redirect_urls: 
      { return_url: 'http://54.198.165.68:3000/',
        cancel_url: 'http://54.198.165.68:3000/' },
     transactions: 
      [ { item_list: 
           { items: 
              [ { name: 'Nike z200',
                  sku: 'item',
                  price: '20.00',
                  currency: 'USD',
                  quantity: 1 } ] },
          amount: { currency: 'USD', total: '20.00' },
          description: 'Service utilization for purchases.' } ] },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


var options = { method: 'POST',
  url: 'http://127.0.0.1:8001/payment',
  headers: 
   { 'Postman-Token': '2ae8d670-52bb-465f-85da-e56f3532646d',
     'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: 
   { intent: 'sale',
     payer: { payment_method: 'paypal' },
     redirect_urls: 
      { return_url: 'ec2-54-198-165-68.compute-1.amazonaws.com:3000',
        cancel_url: 'ec2-54-198-165-68.compute-1.amazonaws.com:3000' },
     transactions: 
      [ { item_list: 
           { items: 
              [ { name: 'Nike z200',
                  sku: 'item',
                  price: '20.00',
                  currency: 'USD',
                  quantity: 1 },
                { name: 'Nike z400',
                  sku: 'item',
                  price: '42.00',
                  currency: 'USD',
                  quantity: 1 } ] },
          amount: { currency: 'USD', total: '62.00' },
          description: 'Service utilization for purchases.' } ] },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


var options = { method: 'POST',
  url: 'http://127.0.0.1:8001/paymentR',
  headers: 
   { 
     'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: 
   { intent: 'sale',
     payer: { payment_method: 'paypal' },
     redirect_urls: 
      { return_url: 'ec2-54-198-165-68.compute-1.amazonaws.com:3000',
        cancel_url: 'ec2-54-198-165-68.compute-1.amazonaws.com:3000' },
     transactions: 
      [ { item_list: 
           { items: 
              [ { name: 'Nike z200',
                  sku: 'item',
                  price: '20.00',
                  currency: 'USD',
                  quantity: 1 },
                { name: 'Nike z400',
                  sku: 'item',
                  price: '42.00',
                  currency: 'USD',
                  quantity: 1 },
                { name: 'Jordan w500',
                  sku: 'item',
                  price: '22.00',
                  currency: 'USD',
                  quantity: 1 } ] },
          amount: { currency: 'USD', total: '84.00' },
          description: 'This is the payment description.' } ] },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


