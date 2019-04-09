const mongoose = require('mongoose');
const Product = require('products');
const moment = require('moment-timezone');
let conn = null;

const uri = 'mongodb+srv://nelson:fuqnd499@cluster0-ngnqw.mongodb.net/test?retryWrites=true';

function validify(number)
{
  //console.log('enters valid');
  if(typeof(number)!='number' || number<0 ||  number>10000)
  {
  //  console.log('validify');
    return false;
  }

  //console.log('was valid');
  return true;
};

//determines the total price after 25% profit margin for seller plus us taking 10% from said profit margin
function total_price(seller_paid)
{
    try{
      seller_paid=Number(seller_paid)
    }
    catch(err){
      throw (err);
    }
    if(!validify(seller_paid))
    {
      throw 'Bad value';
    }

    else
    {
      var seller_profit = seller_paid*.25;
      var our_profit=seller_profit*.1;
      var total = Number(seller_paid)+Number(seller_profit)+Number(our_profit);
      return total;
    }
};




//checks if its a good deal if it is lower than our competitors by atleast 15%
function good_deal(seller_paid,competitors_price)
{
  try{
    seller_paid= Number(seller_paid);
    competitors_price=Number(competitors_price);
  }catch(err){
      throw err;
  }
  if(!validify(seller_paid)|| !validify(competitors_price))
  {
    //console.log('deal');
    throw 'Not a number';
  }

  else
  {
    var total=total_price(seller_paid);
    if(competitors_price!=0 && total>(competitors_price-(competitors_price*.15)))
    {
        //console.log(competitors_price);
        return false;
    }

    else {
      return true;
    }
  }
};



//Quantity sold must not be greater than 10
function quantity_check(qty)
{
  try{
    qty=Number(qty);
  }catch(err){
    throw err;
  }
  if(!validify(qty))
  {
    //console.log('qty');
    throw 'Not a number';
  }

  else if (qty>10 || qty < 1)
  {
    return false;
  }

  else
  {
    return true;
  }
};





//Check if the time provided is not with the 45 minutes to 2 hour range
function sufficient_time(minutes)
{
  try{
    minutes=Number(minutes);
  }catch(err){
    throw err;
  }
  if(!validify(minutes))
  {
    //console.log('time');
    throw 'Not a number';
  }

  if(minutes < 45 || minutes > 120)
  {
      return false;
  }

  else {
    return true;
  }
};




function Discount(price_paid,competitor)
{
  //console.log(competitor);
  try{
    price_paid=Number(price_paid);
    competitor=Number(competitor);
  }catch(err){
    throw err;
  }
  if(!validify(competitor) || !validify(price_paid))
  {
    //console.log('discount')
    throw 'Not a number';
  }

  return (price_paid/competitor);
};









exports.handler = async function(event, context) {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false;

  // Because `conn` is in the global scope, Lambda may retain it between
  // function calls thanks to `callbackWaitsForEmptyEventLoop`.
  // This means your Lambda function doesn't have to go through the
  // potentially expensive process of connecting to MongoDB every time.
  if (conn == null) {
    conn = await mongoose.createConnection(uri, {
      // Buffering means mongoose will queue up operations if it gets
      // disconnected from MongoDB and send them when it reconnects.
      // With serverless, better to fail fast if not connected.
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0 // and MongoDB driver buffering
    });
    conn.model('Product', Product);
  }


  const product = conn.model('Product');

  //const doc = await M.find();
  //console.log(doc);
  const size= event.Size;
  const description = event.Description;
  const img= event.IMG;
  const UPC = event.UPC;
  const title = event.Title;
  const price_paid = event.Price_paid;
  const competitor= event.Competitor;
  const qty = event.Qty;
  const color= event.Color;
  const time = event.Time;
  const weight = event.Weight;
  const seller= event.Seller;
  const brand = event.Brand;
 // var items= await product.find({});
  //return JSON.stringify(items);


    try{
      if(!good_deal(price_paid,competitor))
      {
        return JSON.stringify({"msg":"Sorry , not a good deal"});
      }
    }catch(err){
      return JSON.stringify(err);
    }

    try{
      if(!quantity_check(qty))
      {
        return JSON.stringify('Quantity surpasses our 10 unit limit');
      }

    }catch(err){
      return JSON.stringify(err);
    }

    try{
      if(!sufficient_time(time))
      {
        return JSON.stringify('Not within the 45m to 2hr time range');
      }
    }catch(err){
      return JSON.stringify(err);
    }

    try{

      let total=total_price(Number(price_paid));
      let discount= Discount(total,competitor);
      var t=Number(time);
      var date=moment().tz("America/New_York").add(t,'minutes');
      await product.create({
      UPC:UPC,
      Seller_id:seller,
      Title:title,
      Price:total,
      Competitor:competitor,
      Discount:discount,
      Quantity:qty,
      Size:size,
      Description:description,
      Color:color,
      Brand:brand,
      Img:img,
      expireAt:date
      });
      const duplicate = await product.find({Seller_id:seller,UPC:UPC});

      if(duplicate.length!=0)
      {
          return JSON.stringify('Duplicate Posting');
      }

      else{
      const newItem = await product.save();
      console.log("here");
      return JSON.stringify("Account Created");
    }
    } catch(err){
      console.log(err);
      return JSON.stringify(err);
    }
};
