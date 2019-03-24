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
            <h1 className="text-center">Our Product</h1>
            <br/>
            <div className="row">
              <div className="row">
                <ProductConsumer>
                  {value=>{
                    console.log(value);
                    return value.product.map(product=>{
                      return <Product key={product.id} product={product}/>;
                    });
                  }}
                </ProductConsumer>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductList;