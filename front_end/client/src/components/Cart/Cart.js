import React from 'react';
import {ProductConsumer} from "../../ProductContext.js";
import CartProduct from "./CartProduct.js";
import Navbar from "../Navbar.js";
import Footer from "../Footer.js";
import styled from "styled-components";
import {Link} from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";





//utility function to check if an object is empty
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}



class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: "",

    }
  }

  change_zipcode = (event)=>{
    this.setState({zipcode: event.target.value});
  }



  render() {
    return (
      <ProductConsumer>{value=>{
        let forwardButton;
        if(isEmpty(value.cartProduct)){
          forwardButton=(
            <Link to="/browse">
              <button className="btn-addcart">
                continue shopping
              </button>
            </Link>
          );
        }
        else{
          forwardButton=(
            <Link to="/checkoutform">
              <button className="btn-addcart">
                Proceed to Checkout
              </button>
            </Link>
          )
        }

        let cartItems = value.cartProduct;

        return(
          <div>
            <Navbar/>
            <CartWrapper className="container mb-5">
              <div className="row d-flex center">
                <Link to="/" className="col-4">
                  <img src="img/SnapLogo.png" alt="website logo" className="logo mt-3 mb-5"/>
                </Link>
              </div>
              <div className="header row d-flex">
                <div className="col-3">
                  Items
                </div>
                <div className="col-2">
                  Size
                </div>
                <div className="col-2">
                  Deal Ends
                </div>
                <div className="col-1">
                  <p>Qty.</p>
                </div>
                <div className="col-2">
                  Price
                </div>
              </div>
              <hr/>
              {
                cartItems.map(product=>{
                  return (
                      <CartProduct key={product.Product_id} product={product}/>
                  )
                })
              }
              <div className="row mt-5">
                {/*ship query*/}
                <div className="col-4">
                  <form className="input-group searchBar" onSubmit={(event)=>{
                    event.preventDefault();
                    value.calculateShipRate(this.state.zipcode);
                  }}>
                    <input id="zipcode" className="form-control" type="text" placeholder="Enter Zipcode" aria-label="Search" onChange={this.change_zipcode} />
                    <button type="submit" className="input-group-text lighten-3 btn-calculate">
                      Calculate
                    </button>
                  </form>
                </div>
                {/*ship cost response*/}
                <div className="col-4">
                  {value.shippingCost==0?
                    <p></p>:
                    <p className="shippingCost">{value.shippingCost}</p>
                  }
                </div>
                <div className="col-4">
                  {forwardButton}
                </div>
              </div>
            </CartWrapper>
            <Footer/>
          </div>
      )}}
      </ProductConsumer>
        
    );
  }
}

const CartWrapper = styled.div
`
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
  .center{
    justify-content:center;
  }
  .logo{
    height: 8rem;
  }
  .header{
  }
  .box{
    border:solid 1px black;
  }

  input[type="text"], textarea {
    outline: none;
    box-shadow:none !important;
    border:1px solid #ccc !important;
  }

  button{
    outline: none;
    box-shadow:none !important;
    border:1px solid #ccc !important;
  }

  .btn-calculate{
    &:hover{
    background-color: #EAEAEA;
    box-shadow: 0.75rem;
    }
    &:active {
      box-shadow: 0 0.08rem #444;
      transform: translateY(0.1rem);
    }
  }


`

export default Cart;




// <PayPalButton
//   amount="0.01"
//   onSuccess={(details, data) => {
//     console.log(details);
//     console.log(data);

//     // OPTIONAL: Call your server to save the transaction
//     return fetch("/paypal-transaction-complete", {
//       method: "post",
//       body: JSON.stringify({
//         orderId: data.orderID
//       })
//       .then(res=>{
//         res.json();
//       })
//       .then(res=>{
//         console.log(res);
//       })
//       .catch(err=>{
//         console.log(err);
//       })

//     });

//   }}
//   options={{
//     clientId: "AW3ZFvNBLp0K92uNCALK2NTBYeaPplZgFfZpsMoQaX-ftgiia2US3ZaXicpm064A2z1p5tJezt8fD7l6"
//   }}
// />