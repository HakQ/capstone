var encryptTool = require("/home/tuxschool/Desktop/Link to Mern Setup/Utilities/paypalEncrypt.js");
var fs  = require("fs");
var authKey;
var paypal = require('paypal-rest-sdk');
var paypalAPI = require("/home/tuxschool/Mern Setup/Utilities/apiFunctions.js");
//Return obj type
function typeOf(obj) {
  return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
}
var paypalInfoArr = fs.readFileSync("/home/tuxschool/Desktop/Link to Mern Setup/config/paypal_config").toString().split('\n');
console.log(paypalInfoArr);
console.log("\n" + paypalInfoArr[0] + "\n");
console.log(typeOf(paypalInfoArr[0]));
var paypal_client_id = paypalInfoArr[0];  //'AW3ZFvNBLp0K92uNCALK2NTBYeaPplZgFfZpsMoQaX-ftgiia2US3ZaXicpm064A2z1p5tJezt8fD7l6';
var paypal_client_secret = paypalInfoArr[1];  //'EA8nIoVPZHQDYVq_BuoZBKetkmGimeqZo5HQsDO6n9OnZPe5d6n52ts-CSepROPhur7D2h_C69yQjj__';
paypal.configure({
  mode: 'sandbox', // Sandbox or live
  client_id: paypal_client_id,
  client_secret: paypal_client_secret});

var stringSplitVar = { s1 : "", s2 : ""};

async function splitString(str) {
    str = str.toString();
    var middle = Math.ceil(str.length / 2);
    stringSplitVar.s1 = str.slice(0, middle);
    stringSplitVar.s2 = str.slice(middle);
    return new Promise(function(resolve,reject){
        resolve(stringSplitVar);
    });
};

async function getString(){
    var stringVar = await splitString((paypal_client_secret));
    console.log("Waited");
    console.log(stringVar);
}

getString();
var hw = encryptTool.encryptText("Some serious stuff");
console.log(hw);
console.log(encryptTool.decryptText(hw));




function check_MAL_JSON(data){
    console.log(data.intent + "    " + typeOf(data.intent));
    console.log(data.intent == 'sale');
    if(data.intent != "sale"){
        return true;
        // || data.intent != "order" || data.itent != "authorize"
    }
    return false;
}

function renewKey(){
    paypalData = {user: paypal_client_id, pass: paypal_client_secret, aKey : ""};
    paypalAPI.renewAccess(paypalData, function(err, match){
        console.log(" paypalAPI.renewAccess  " + match);
        if(err){
            console.log("failed to renew");
        }
        else{
            authKey = paypalData.aKey;
            console.log("AUTH KEY CONF: " + authKey);
        }
    });
}


module.exports = function(app) {
  app.get('/payment/:id', (req, res) => {
    
  });

  app.post('/paymentR', (req, res) => {
        //const note = { User: req.body.User, Pass: req.body.Password, KeyPass: "test" };
        const payData = req.body;
        var errState = (payData == null) ? null : false;
        err = check_MAL_JSON(payData);
        if (err) throw err; // Check for the error and throw if it exists.
        paypal.payment.create(payData, function (error, payment) {
            if (error) {
                //throw error;
                res.write("Unable to process payment, check inputted data/try again\n\n");
                res.write(JSON.stringify(payData, null, 4));
                renewKey();
                res.end();
            } else {
                console.log("Create Payment Response:\n");
                console.log(payment);
                console.log("\n");
                var links = payment.links;
                var redirect = links[1].href;
            
                res.send(redirect);
                
            }
        });  
        console.log('got data: '+ req); // Otherwise proceed as usual.JSON.stringify(data, null, 4)
       
  });

  app.post('/payment', (req, res) => {
        const payData = req.body;
        var errState = (payData == null) ? null : false;
        var err = check_MAL_JSON(payData);
        if (err) throw err; // Check for the error and throw if it exists.
        paypal.payment.create(payData, function (error, payment) {
            if (error) {
                //throw error;
                res.write("Unable to process payment, check inputted data/try again\n\n");
                res.write(JSON.stringify(payData, null, 4));
                renewKey();
                res.end();
            } else {
                console.log("Create Payment Response:\n");
                console.log(payment);
                console.log("\n");
                //var links = payment.links;
                
                res.send(payment);
                
            }
        });  
        console.log('got data: '+ req); // Otherwise proceed as usual.JSON.stringify(data, null, 4)
  });
  
  app.post('/invoice', (req, res) => {
       var create_invoice_json = req.body;
       var err = create_invoice_json == null;
       if (err) throw err;
       paypal.invoice.create(create_invoice_json, function (error, invoice) {
        if (error) {
            res.send(error);
            renewKey();
            //throw error;
        } else {
            console.log("Create Invoice Response");
            console.log(invoice);
        }
       });
  });
  app.put('/payment/:id', (req, res) => {
    
  });

  app.delete('/payment/:id', (req, res) => {
   
  });
};
