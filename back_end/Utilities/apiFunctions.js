var request = require('request');
function typeOf(obj) {
  return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
}


exports.renewAccess = function(paypalData, callback) {
    console.log(paypalData);
    var headers = {
        'Accept': 'application/json',
        'Accept-Language': 'en_US'
    };


    var dataString = 'grant_type=client_credentials';
    var accessToken;
    var options = {
        url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
        method: 'POST',
        headers: headers,
        body: dataString,
        auth: {
            'user': paypalData.user,
            'pass': paypalData.pass
        }
    };

    function callbackFunc(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(typeOf(body));
            var newBody = JSON.parse(body);
            //console.log("NEW BODY\n" + newBody);
            console.log(JSON.stringify(JSON.parse(body), null, 4));
            accessToken = newBody.access_token;
            console.log(accessToken + "\n\n\n");
            paypalData.aKey = accessToken;
            console.log("  paypalData.aKey  " +  paypalData.aKey );
            return callback(error, paypalData);
        }
    }


   request(options, callbackFunc);   

};

