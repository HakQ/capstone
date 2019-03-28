const errors = require('restify-errors');
const Product = require('../models/products');

module.exports = server=> {
  server.get('/products',async(req,res,next)=>
{
  try{
    const product=await Product.find({})
    res.send(product);
  }catch(err){
    return next(new errors.InvalidContentError(err));
  }

})
}
