import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import {ProductConsumer} from "../../ProductContext.js";

class CartProduct extends React.Component {
  render() {
    const {id,info,title,img,price, discount, retail, inCart, time} = this.props.product;
    let discount_percent = Math.ceil(100*discount); 

    return (
      <ProductConsumer>{(value)=>{return(
        <ProductWrapper>
          <div className="row justify-content-between">
              <div className="col-5">
                <h6 className="text-center"> {title} </h6>
                <img src={img} className="d-block mx-auto" />
                <button className="btn-addcart d-block mx-auto mt-1">
                    Release to Shop
                </button>
              </div>
              <div className="col-3 align-self-center">
                <p>${price}</p>
              </div>
          </div>
        </ProductWrapper>
      )}}
      </ProductConsumer>   
    );
  }
}

export default CartProduct;

const ProductWrapper = styled.div
`
  .btn-addcart{
    width: 50%;
    background-color: var(--AmazonYellow);
    border: 0.8px black solid;
    padding: 0;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1rem;
    box-shadow: 0.3rem;
    border-radius: .25rem;
    &:hover{
      background-color: #FFB90B;
      box-shadow: 0.75rem;
    }
    &:active {
      box-shadow: 0 0.08rem #444;
      transform: translateY(0.1rem);
    }
    outline:none;
  }

  img{
    width: 8rem;
    height: 8rem;
  }

  @media only screen and (max-width: 480px) {
    p{
      font-size: 0.5em;
    }
  }
`