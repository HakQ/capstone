import React from 'react';
import {ProductConsumer} from "../../ProductContext.js";
import {Link} from "react-router-dom";
import styled from "styled-components";

class Detail extends React.Component {
  render() {
    return (
      <ProductConsumer>{value=>{
        const {id,title,img,price,inCart, info, time} = value.viewProduct;
        return(
          <DetailWrapper>
            <div className="container h-100" >
              <div className="row justify-content-center align-items-center">
                <div className="col-lg-6 col-md-6 col-sm-12 picture">
                  <img src={img} />
                </div>
                <div className="col-md-6 col-lg-6 col-sm-12 info">
                  <h2 className="font-weight-bold"> {title} </h2>
                  <p> {info} </p>
                  <p>
                    <span className="font-weight-bold">Price:   </span> 
                    <span>$</span><span>{price}</span>
                  </p>
                  <p>
                    <span className="font-weight-bold">Time Remaining:   </span>
                    <span>{time} minutes left</span> 
                  </p>
                  <button className="btn btn-primary rounded-pill addCart">
                    <i className="fas fa-cart-plus"/>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
              <div className="row justify-content-center">
                <Link to="/browse">
                  <button className="btn btn-secondary">
                    <span>Go Back</span>
                  </button>
                </Link>
              </div>
            </div>
          </DetailWrapper>
      )}}
      </ProductConsumer>
    );
  }
}

const DetailWrapper = styled.div
`
  height:50rem;

  img{
    height: 80%;
    width:70%;
  }
  .row{
    height: 30rem;
  }

  .addCart{
    border: 0;
  }

  .btn{
    outline:none;
  }

`


export default Detail;