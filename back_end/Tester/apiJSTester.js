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
        console.log("Ya boii");
        console.log(body);
    }
    console.log(error);
    console.log(response.statusCode);
}

request(options, callback);

