import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import {ProductConsumer} from "../../ProductContext.js";
import Timer from "./Timer.js";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      add_cart_display:"block",
      mess_display: "none",
    }
  }

  changeDisplay=()=>{
    this.setState({
      add_cart_display: "none",
      mess_display: "block"
    })
  }



  render() {
    const {id,title,img,price, discount, retail, inCart, time, size} = this.props.product;
    let discount_percent = Math.ceil(100*discount);
    let name;

    if(title.length > 14){
      name = title.substr(0,16) + "...";
    }
    else{
      name = title;
    }

    const {endDate} = this.props.product;

    /**********playground mode******/

    // let now = new Date();
    // console.log("time: ", endDate);
    // endDate.setSeconds( endDate.getSeconds() + 1 );
    // console.log("second added: ", endDate);




    // let now = new Date().getTime();
    // let t = endDate - now;
    // if (t >= 0) {
    //   let days = Math.floor(t / (1000 * 60 * 60 * 24));
    //   let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //   let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    //   let secs = Math.floor((t % (1000 * 60)) / 1000);

    // }
    // else{
    //   console.log("time expired");
    // }



    /*************************/ 

    return (
      <ProductConsumer>{(value)=>{return(
        <ProductWrapper className="col-sm-9 col-md-6 col-lg-3 my-2 mx-auto">
          <div className="card">
            <div className="card-header mt-1 mx-auto">
              <h4><strong>{name}</strong></h4>
            </div>
            <div className="img-container">
              <Link to="/detail" onClick={()=>{value.setView(id)}} className="mx-auto">
                <img src={img} className="card-img-top mx-auto d-block" alt="image of product"/>
              </Link>
            </div>
            <div className="card-footer show-price mx-auto">
              <h5 className="card-title ml-3">
                ${price}
                <span className="badge badge-danger discout_sign ml-2">you saved{discount_percent}%</span>
              </h5>
              <h6 className="card-subtitle ml-3 smaller-text">
                <span> Retail Price:</span><span className="cross-out">${retail}    </span> 
              </h6>
              <h6 className="ml-3 text-center">Size:{size} </h6>
            </div>
            <div className="timer mx-auto">
              <span> Ends in </span>
              <Timer expire={endDate} id={id}/>
            </div>
            <div className="card-footer justify-content-center">
              <p className="text-success" style={{display:this.state.mess_display}}><span>&#10003;</span> successfully added to cart</p>
              <button className="w-60 btn-addcart mx-auto" style={{display:this.state.add_cart_display}} onClick={()=>{
                this.changeDisplay();
                value.addToCart(id);
              }}>
                Claim to Cart
              </button>
            </div>
          </div>
        </ProductWrapper>
      )}}
      </ProductConsumer>   
    );
  }
}

export default Product;

const ProductWrapper = styled.div
`
  .card{
    border: solid 1px lightgray;
    transition:all 1s linear;
    box-shadow: 0.4rem rgba(0,0,0,0.2);
  }

  .card-header{
    background:transparent;
    border:transparent;
  }

  .card-footer{
    background:transparent;
    border-top:transparent;
  }

  &:hover{
    .card{
      border:0.04rem solid rgba(0,0,0,0.2);
      box-shadow:2px 2px 5px 0px rgba(0,0,0,0.2)
    }
  }

  .img-container{
    position:relitive;
    overflow: hidden;
  }

  .card-img-top{
    transition: linear;
  }

  .img-container:hover .card-img-top{
    transform: scale(1.1);
  }

  img {
    width: 13rem;
    height: 13rem;
  }
  
  .btn-addcart{
    width: 80%;
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

    
  .smaller-text{
    font-size:  0.8rem;
  }

  .cross-out{
    text-decoration: line-through;
  }

  .timer{
    font-size: 0.8rem;
    color: gray;
    margin-top: -1.5rem;
    padding-top: -1.5rem;
  }

  .discout_sign{
    font-size: 0.7rem;
  }
  
`