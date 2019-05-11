import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import {ProductConsumer} from "../../ProductContext.js";
import Timer from "../Browse/Timer.js"

class CartProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial_price:this.props.product.Price,
      price:this.props.product.Price,
      qty:1
    }
  }

  change_qty=(e)=>{
    let newPrice = this.state.initial_price * e.target.value;
    this.setState({qty:e.target.value, price:newPrice});
  }

  render() {
    const {Product_id,Description,Title,IMG,Price, Discount, Competitor, inCart, expireAt,Size} = this.props.product;
    let discount_percent = Math.ceil(100*Discount);

    return (
      <ProductConsumer>{(value)=>{return(
        <ProductWrapper>
          <div className="row d-flex item">
            <div className="col-3">
              <h6 className="text-center"> {Title} </h6>
              <img src={IMG} className="d-block mx-auto itemImage" />
            </div>
            <div className="col-2">
              <p>Size: {Size} </p>
            </div>
            <div className="col-2">
              <Timer expire={expireAt} id={Product_id}/>
            </div>
            <div className="col-1">
              <select name="Qty" onChange={this.change_qty}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div className="col-2">
              <p>${this.state.price}</p>
            </div>
            <div className="col-2">
              <button type="button" className="btn btn-danger" onClick={()=>{value.cancelFromCart(Product_id)}}>Cancel</button>
            </div>
          </div>
          <hr/>
        </ProductWrapper>
      )}}
      </ProductConsumer>   
    );
  }
}

export default CartProduct;

const ProductWrapper = styled.div
`
  .item{
    align-items: center;
  }
  .itemImage{
    width:65%;
    height:8rem;
  }
`