const errors = require('restify-errors');
const Product = require('../models/products');
const moment = require('moment-timezone');

function validify(number)
{
  console.log('enters valid');
  if(typeof(number)!='number' || number<0 ||  number>10000)
  {
    console.log('validify');
    return false;
  }

  console.log('was valid');
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




//checks if its a good deal if it is less than retail and lower than our competitors by atleast 15%
function good_deal(seller_paid,competitors_price,retail)
{
  try{
    seller_paid= Number(seller_paid);
    competitors_price=Number(competitors_price);
    retail=Number(retail);
  }catch(err){
      throw err;
  }
  if(!validify(seller_paid)|| !validify(competitors_price) || !validify(retail))
  {
    console.log('deal');
    throw 'Not a number';
  }

  else
  {
    var total=total_price(seller_paid);
    if(competitors_price!=0 && total>(competitors_price-(competitors_price*.15)))
    {
        console.log(competitors_price);
        return false;
    }

    else if (total>retail) {
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
    console.log('qty');
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
    console.log('time');
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




function Discount(price_paid,retail)
{

  try{
    price_paid=Number(price_paid);
    retail=Number(retail);
  }catch(err){
    throw err;
  }
  if(!validify(retail) || !validify(price_paid))
  {
    console.log('discount')
    throw 'Not a number';
  }

  return (price_paid/retail);
};




module.exports = server => {

server.get('/get',async(req,res,next)=>
{
  try{
    const product=await Product.find({})
    res.send(product);
  }catch(err){
    return next(new errors.InvalidContentError(err));
  }

})

server.post('/upload',async (req,res,next)=>{

    //check if the response we received was json
    if(!req.is('application/json')){
      return next(new errors.InvalidContentError("NOT JSON"))
    }

    const {upc,seller,title,price_paid,competitors,retail,qty,size,time,description,color}=req.body;
    console.log(seller,title,price_paid,competitors,retail,qty,size,time,description,color);

    //if it is a good deal and the time is within bounds then commit to db
    try{
      if(!good_deal(price_paid,competitors,retail))
      {
        res.send({"msg":"Sorry , not a good deal"});
      }
    }catch(err){
      return next(new errors.InvalidContentError(err));
    }

    try{
      if(!quantity_check(qty))
      {
        return next(new errors.InvalidContentError('Quantity surpasses our 10 unit limit'));
      }
      total=total_price(price_paid);
      discount= Discount(total,retail);
    }catch(err){
      return next(new errors.InvalidContentError(err));
    }

    try{
      if(!sufficient_time(time))
      {
        return next(new errors.InvalidContentError('Not within the 45m to 2hr time range'));
      }
    }catch(err){
      return next(new errors.InvalidContentError(err));
    }

    try{

      const item = new Product();
      item.UPC=upc;
      item.Seller_id=seller;
      item.Title=title;
      item.Price=total;
      item.Retail=retail;
      item.Discount=discount;
      item.Quantity=qty;
      item.Size=size;
      item.Description=description;
      item.Color=color;
      console.log('item created');

      const duplicate = await Product.find({Seller_id:seller,UPC:upc});

      if(duplicate.length!=0)
      {
          return next(new errors.InvalidContentError('Duplicate Posting'));
      }

      var t=Number(time);
      //console.log(moment.tz("America/New_York"))
      var date=moment().tz("America/New_York").add(t,'minutes');
      //console.log(date);
      item.expireAt=date._d;
      //console.log(date._d);
      const newItem = await item.save();
      res.send(201);
      next();
    } catch(err){
      return next(new errors.InternalError(err.message));
    }

});

};
