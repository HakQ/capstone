import React, {Component} from 'react';
import {storeProducts} from "./static/data.js";
import axios from "axios";

/*import qs from 'qs';
const data = { 'bar': 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
  params: {ID: 12345},
};
axios(options);*/


const ProductContext = React.createContext();
//create the provider class
class ProductProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product:{},
      viewProduct:{},
      cartProduct:[]
    }
  }

  componentWillMount(){
    this.setState({
      product: storeProducts
    });
  }

  componentDidMount() {

    /***playground****/
    // let upc = "888411924708"; //nike runningg shoes
    // let location = "https://api.upcitemdb.com/prod/trial/lookup?upc="; //location

    // axios({
    //   method: 'get', 
    //   url: 'http://localhost:8000/test',
    //   data: {},
    //   proxy: {
    //     host: '127...',
    //     port: 8000
    //   },

    // })
    // .then(function (response) {
    //   console.log("then :" + response);
    // })
    // .catch(function (error) {
    //   console.log("Error : " +error);
    // }); 
    /*********/
    axios.get("http://localhost:3002/get_info",{
      params: {
        upc:"888411924708"
      },
      data:{
        upc:"888411924708"
      },
      headers: { 
        "Content-Type": "application/json"
      }
    })
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })

  }

  //functions for children to interact with the context api
  setView=(id)=>{
    const tempProduct = this.state.product.find(item=>item.id===id);
    this.setState({
      viewProduct: tempProduct,
    })
  }

  addToCart=(id)=>{
    const addCartProduct = this.state.product.find(item=>item.id===id);
    const newProduct = this.state.product.filter((item) =>{ 
      return item.id !== addCartProduct.id;  
    });
    let currentCart = this.state.cartProduct;
    currentCart.push(addCartProduct)

    this.setState({
      cartProduct: currentCart,
      product: newProduct
    })

  }

  expireHandler=(id)=>{
    const newProduct = this.state.product.filter((item) =>{ 
      return item.id !== id;  
    });

    this.setState({
      product: newProduct
    })
  }

  render() {
    return (
      <ProductContext.Provider 
        value={
          {
            message:"Message from product context",
            product: this.state.product,
            viewProduct:this.state.viewProduct,
            setView: this.setView,
            addToCart: this.addToCart,
            cartProduct:this.state.cartProduct,
            expireHandler: this.expireHandler
          }
        }
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

//create the consumer class
const ProductConsumer = ProductContext.Consumer;

export {ProductConsumer, ProductProvider};