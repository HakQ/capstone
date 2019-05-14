import React from 'react';
import {ProductConsumer} from "../../ProductContext.js";
import {Link} from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar.js";
import Footer from "../Footer.js";
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
        const {_id,Title,IMG,Price,inCart, Description, time, expireAt, Competitor,Discount, Size} = value.viewProduct;
        let discount_percent = Math.ceil(100*Discount);

        return(
          <React.Fragment>
            <Navbar/>
             <DetailWrapper className="mt-5">
              <div className="text-center mb-5">
                <Link to="/">
                  <img src="img/SnapLogo.png" className="logo" />
                </Link>
              </div>

              <div className="container mt-5" >
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 picture d-flex">
                    <img src={IMG} className="box" />
                  </div>
                  <div className="col-md-6 col-lg-6 col-sm-12 info d-flex">
                    <div>
                      <h2> {Title} </h2>
                      <hr/>
                      <h6><span className="cross-out">${Competitor}</span> <span className="badge badge-danger">you saved{discount_percent}% </span></h6>
                      <h6 className="card-title">${Price} </h6>
                      <h6>Size: {Size}</h6>
                      <p> {Description} </p>
                      <div className="timer mx-auto text-center margin-4rem">
                        <span> Ends in </span>
                        <Timer expire={expireAt} id={_id}/>
                      </div>
                      <div className="addcart-btn mx-auto d-flex">
                        <p className="text-success" style={{display:this.state.mess_display}}><span>&#10003;</span> successfully added to cart</p>
                        <button className="btn btn-primary rounded-pill addCart pt-0 mt-0" style={{display:this.state.add_cart_display}} onClick={()=>{
                          this.changeDisplay();
                          value.addToCart(_id);
                        }}>
                          <i className="fas fa-cart-plus"/>
                          <span>Claim To Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center  margin-12rem">
                  <Link to="/browse">
                    <button className="btn btn-secondary">
                      <i class="fas fa-arrow-left"></i>
                      <span> Go Back</span>
                    </button>
                  </Link>
                </div>
              </div>
             </DetailWrapper>
             <Footer/>
          </React.Fragment>
      )}}
      </ProductConsumer>
    );
  }
}

const DetailWrapper = styled.div
`
  .margin-12rem{
    margin-top: 12rem;
  }

  .margin-4rem{
    margin-top: 4rem;
  }

  .logo{
    width:16rem;
    height:7rem;
  }

  img {
    width: 20rem;
    height: 25rem;
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
    border: solid black 1px;
  }

  .cross-out{
    text-decoration: line-through;
  }
  .addcart-btn{
    justify-content: center;
  }
`


export default Detail;

