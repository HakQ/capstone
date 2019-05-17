const express = require('express');
const router = express.Router();
const https = require('https');


//test get route
router.get('/info', (req, res) => { 
  res.json({msg:"hello"});
});

//test post route
router.post('/info', (req, res) => {
  res.json({msg:"bad bad bad"});
  // const param=req.query
  // const param=req.params
});

//test upcitedb
router.get("/get_info", (req, res)=>{
  // res.json({msg:"WTF!!!!!!!!!!!!"});
  const para = req.query.upc;
  console.log( para, typeof(para) );
  console.log("\n\n\n");

  /********************Code given by upcitedb***************/
  var opts = {
    hostname: 'api.upcitemdb.com',
    path: '/prod/trial/lookup',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    }
  }
  var req2 = https.request(opts, function(res2) {
    console.log('statusCode: ', res2.statusCode);
    console.log('headers: ', res2.headers);
    res2.on('data', function(d) {
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
              res.header('content-type', 'json');
              var jsonF = {
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
                };
              res.write(JSON.stringify(jsonF, null, 4));
              res.end();
      // res.send(d);
    })
  })
  req2.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  })
  req2.write('{ \"upc\": ' + '\"' + (para.toString()) + '\" }')
  req2.end()
  /************************************************************/
  // req2.write('{ "upc": "4002293401102" }')


});


module.exports = router;




























// const errors = require('restify-errors');
// const https = require('https')
// var opts = {
//   hostname: 'api.upcitemdb.com',
//   path: '/prod/trial/lookup',
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json"
//   }
// }
// function typeOf(obj) {
//   return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
// }

// function isJson(str) {
//     try {
//         JSON.parse(str);
//     } catch (e) {
//         return false;
//     }
//     return true;
// }

// module.exports = function(app) {
// app.get('/upc/:upcID', (req, res) => {
//     console.log(req.params.upcID);
//     const dataUPC = { "upc" : req.params.upcID.toString()};
//     console.log(dataUPC);
//     try{
//         var requestVar = https.request(opts, function(resV)
//         {
//         console.log('statusCode: ', resV.statusCode);
//         console.log('headers: ', resV.headers);
//          console.log("BRUH");
//             resV.on('data', function(data) {
//             console.log("What broke");
//             console.log(data.toJSON());
//               //  let object = JSON.parse(d);
//               // console.log(JSON.stringify(object.code));
//               var temp = JSON.parse(data);
//               console.log(temp);
//               let object = temp;
//               console.log(object);
//               var title=object.items[0].title;
//               var desc=object.items[0].description;
//               var upc= object.items[0].upc;
//               var brand = object.items[0].brand;
//               var color = object.items[0].color;
//               var size = object.items[0].size;
//               var img = object.items[0].images;
//               var weight = object.items[0].weight;
//               var price = object.items[0].offers[0].price;
//               console.log(
//                 "title: ", title, "\n",
//                 "desc: ", desc, "\n",
//                 "upc: ", upc, "\n",
//                 "brand: ", brand, "\n",
//                 "color: ", color, "\n",
//                 "size: ", size, "\n",
//                 "img: ", img, "\n",
//                 "1stprice: ", price, "\n",
//               )
//               //console.log(object.items[0].description);
//               res.header('content-type', 'json');
//               var jsonF = {
//                   title : title,
//                   description : desc,
//                   upc : upc ,
//                   brand : brand,
//                   color : color,
//                   size : size,
//                   img : img,
//                   weight : weight,
//                   price : price,
//                   seller : "new seller",
//                   time : "45" ,
//                   price_paid : "40"
//                 };
//               res.write(JSON.stringify(jsonF, null, 4));
//               res.end();
//             })
//             });
//         requestVar.on('error', function(e) {
//         console.log('problem with request: ' + e.message);
//         })
//         console.log("huh");
//         //requestVar.write('{ "upc": "4002293401102" }');
//         requestVar.write(JSON.stringify(dataUPC));
//         requestVar.end();
//         //res.write("WHY");
//         //res.end();
        
//     }
//     catch{
//         req.write("Borked");
//         req.end();
//         console.log("well, that broke");
//     }
// });


// app.get('/get',(req,re,next) =>
// {
//     if(!req.is('application/json')){
//       return next(new errors.InvalidContentError("NOT JSON"));
//     }
//     console.log("Why tho");
//     const upc = req.body;
//     //console.log(JSON.parse(upc));
//     console.log(isJson(upc));
//     try{
//           console.log("Come on ");
//           var req1 = https.request(opts, function(res)
//           {
//             // console.log('statusCode: ', res.statusCode);
//             // console.log('headers: ', res.headers);
//             console.log("BRUH");
//             res.on('data', function(d) {
//             console.log("What broke");
//             console.log(d.toJSON());
//               //  let object = JSON.parse(d);
//               // console.log(JSON.stringify(object.code));
//               var temp = JSON.parse(d);
//               console.log(temp);
//               let object = temp;
//               console.log(object);
//               var title=object.items[0].title;
//               var desc=object.items[0].description;
//               var upc= object.items[0].upc;
//               var brand = object.items[0].brand;
//               var color = object.items[0].color;
//               var size = object.items[0].size;
//               var img = object.items[0].images;
//               var weight = object.items[0].weight;
//               var price = object.items[0].offers[0].price;
//               console.log(
//                 "title: ", title, "\n",
//                 "desc: ", desc, "\n",
//                 "upc: ", upc, "\n",
//                 "brand: ", brand, "\n",
//                 "color: ", color, "\n",
//                 "size: ", size, "\n",
//                 "img: ", img, "\n",
//                 "1stprice: ", price, "\n",
//               )
//               //console.log(object.items[0].description);
//               res1.header('content-type', 'json');
//               res1.send(
//                 {
//                   title : title,
//                   description : desc,
//                   upc : upc ,
//                   brand : brand,
//                   color : color,
//                   size : size,
//                   img : img,
//                   weight : weight,
//                   price : price,
//                   seller : "new seller",
//                   time : "45" ,
//                   price_paid : "40"
//                 });

//             })

//           })
//           req1.on('error', function(e) {
//           console.log('problem with request: ' + e.message);
//           })
//           console.log("Deion said fuck Asssmon");
//           req1.write({"upc" : "826218169397"});
//           console.log("After upc");
//           req1.end();
//     }catch(err){
//       return next(new errors.InvalidContentError(err));
//     }

// });




// };