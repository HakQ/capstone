const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const ProductSchema = new mongoose.Schema({
  _id: { type: String, default:  function genUUID(){ return uuidv4();}},
  UPC: {type:String , required:true},
  Seller_id:{ type:String , required:true},
  Title:{type:String,required: true},
  Price:{type:Number,required: true},
  Competitor:{type:Number,required: true},
  Discount:{type:Number, required: true},
  Quantity:{type:Number,required:true},
  Size:{type:String , required:true , default:'OS'},
  Description:{type:String, default:'No Description Available'},
  expireAt: { type: Date , required:true },
  Color:{type:String , required:true},
  Img:[{type : String}],
  SoldOut:{type:Boolean , default:false}
});

ProductSchema.index({"expireAt":1},{expireAfterSeconds:0},function(error, indexName){
    if(error) console.log(error);
    console.log(indexName);});

const Product= mongoose.model('Product',ProductSchema);
module.exports = Product;
