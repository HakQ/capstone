const errors = require('restify-errors');
const https = require('https')
var opts = {
  hostname: 'api.upcitemdb.com',
  path: '/prod/trial/lookup',
  method: 'POST',
  headers: {
    "Content-Type": "application/json"
  }
}

module.exports = server => {

server.get('/get',(req,re,next) =>
{
    if(!req.is('application/json')){
      return next(new errors.InvalidContentError("NOT JSON"));
    }

    const upc = req.body;

    try{
          var req = https.request(opts, function(res)
          {
            // console.log('statusCode: ', res.statusCode);
            // console.log('headers: ', res.headers);
            res.on('data', function(d) {

              //  let object = JSON.parse(d);
              // console.log(JSON.stringify(object.code));
              let object = JSON.parse(d);
              var title=object.items[0].title;
              var desc=object.items[0].description;
              var upc= object.items[0].upc;
              var brand = object.items[0].brand;
              var color = object.items[0].color;
              var size = object.items[0].size;
              var img = object.items[0].images;
              var weight = object.items[0].weight;
              var price = object.items[0].offers[0].price;
              console.log(
                "title: ", title, "\n",
                "desc: ", desc, "\n",
                "upc: ", upc, "\n",
                "brand: ", brand, "\n",
                "color: ", color, "\n",
                "size: ", size, "\n",
                "img: ", img, "\n",
                "1stprice: ", price, "\n",
              )
              //console.log(object.items[0].description);
              re.header('content-type', 'json');
              re.send(
                {
                  title : title,
                  description : desc,
                  upc : upc ,
                  brand : brand,
                  color : color,
                  size : size,
                  img : img,
                  weight : weight,
                  price : price,
                  seller : "new seller",
                  time : "45" ,
                  price_paid : "40"
                });

            })

          })
          req.on('error', function(e) {
          console.log('problem with request: ' + e.message);
          })

          req.write(upc);
          req.end();
    }catch(err){
      return next(new errors.InvalidContentError(err));
    }

});




};