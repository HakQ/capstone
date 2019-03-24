import React, {Component} from 'react';
import {storeProducts} from "./static/data.js";
const ProductContext = React.createContext();

//create the provider class
class ProductProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product:{},
      viewProduct:{}
    }
  }

  componentWillMount(){
    this.setState({
      product: storeProducts
    });
  }

  componentDidMount() {

  }

  setView=(id)=>{
    const tempProduct = this.state.product.find(item=>item.id===id);
    this.setState({
      viewProduct: tempProduct,
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
            setView: this.setView
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
