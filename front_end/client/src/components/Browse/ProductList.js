import React from 'react';
import {ProductConsumer} from "../../ProductContext.js";
import Product from "./Product.js";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <h1 className="text-center">Today's Deal</h1>
            <br/>
            <div className="row">
                <ProductConsumer>
                  {value=>{
                    return value.product.map(product=>{
                      // if(!product.inCart){
                        return <Product key={product.id} product={product}/>;
                      // }
                    });
                  }}
                </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductList;