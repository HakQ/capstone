import React from 'react';
import {ProductConsumer} from "../../ProductContext.js";
import {Link} from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar.js";
import Timer from "./Timer.js";


class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      add_cart_display:"block",
      mess_display: "none"
    }
  }

  changeDisplay(){
    this.setState({
      add_cart_display: "none",
      mess_display: "block"
    })
  }


  render() {
    return (
      <ProductConsumer>{value=>{
        const {id,title,img,price,inCart, info, time, endDate, retail,discount} = value.viewProduct;
        let discount_percent = Math.ceil(100*discount);

        return(
          <React.Fragment>
            <Navbar/>
             <DetailWrapper className="mt-5">
              <div className="container-fluid px-3" >
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 picture d-flex ">
                    <img src={img} className="" />
                  </div>
                  <div className="col-md-6 col-lg-6 col-sm-12 info d-flex">
                    <div>
                      <h2 className="mb-3"> {title} </h2>
                      <h6 className="card-subtitle ml-3 smaller-text">
                        <span> Retail Price:</span><span className="cross-out">${retail}</span> 
                        <span className="badge badge-danger">you saved{discount_percent}% </span>
                      </h6>
                      <h5 className="card-title ml-3">${price} </h5>
                      <p> {info} </p>
                      <div className="timer mx-auto text-center">
                        <Timer expire={endDate} id={id}/>
                      </div>
                      <div className="addcart-btn mx-auto d-flex">
                        <p className="text-success" style={{display:this.state.mess_display}}><span>&#10003;</span> successfully added to cart</p>
                        <button className="btn btn-primary rounded-pill addCart pt-0 mt-0" style={{display:this.state.add_cart_display}} onClick={()=>{
                          this.changeDisplay();
                          value.addToCart(id);
                        }}>
                          <i className="fas fa-cart-plus"/>
                          <span>Claim To Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center my-3">
                  <Link to="/browse">
                    <button className="btn btn-secondary">
                      <span>Go Back</span>
                    </button>
                  </Link>
                </div>
              </div>
             </DetailWrapper>
          </React.Fragment>
      )}}
      </ProductConsumer>
    );
  }
}

const DetailWrapper = styled.div
`
  img {
    width: 50%;
    height: 18rem;
  }
  
  .row{
    height: 30rem;
  }

  .addCart{
    border: 0;
  }
  .btn:focus,.btn:active {
    outline: none !important;
    box-shadow: none;
  }
  .timer{
    font-size: 0.8rem;
    color: gray;
  }
  .picture{
    height:25rem;
    align-items: center;
    justify-content:center;
  }
  .info{
    height: 25rem;
    align-items: center;
    justify-content:center;
  }

  .box{
    border: solid black .02rem;
  }

  .cross-out{
    text-decoration: line-through;
  }
  .addcart-btn{
    justify-content: center;
  }
`


export default Detail;

