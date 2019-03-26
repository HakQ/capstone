import React from 'react';
import {ProductConsumer} from "../../ProductContext.js";
import CartProduct from "./CartProduct.js";

class Cart extends React.Component {
  render() {
    return (
      <ProductConsumer>{value=>{
        return(
          <div className="container">
            <h1 className="row justify-content-center py-3">Shopping Cart</h1>
            <h5 className="row justify-content-between">
              <div className="col-3 ml-2"> 
                Items
              </div>
              <div className="col-3 ml-2"> 
                Price
              </div>
            </h5>
            <hr/>
            {
              value.cartProduct.map(product=>{
                return (
                  <div>
                    <CartProduct key={product.id} product={product}/>
                    <hr/>
                  </div>
                )
              })
            }
          </div>
      )}}
      </ProductConsumer>
        
    );
  }
}

export default Cart;