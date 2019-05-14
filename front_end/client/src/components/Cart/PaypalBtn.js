import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import {ProductConsumer} from "../../ProductContext.js";
import {Link} from "react-router-dom";
import styled from "styled-components"; 
import {PayPalButton} from "react-paypal-button-v2";



class PaypalBtn extends Component {

   constructor(props) {
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <PaymentWrapper className="container mt-5">
        <div className="text-center">
          <Link to="/">
            <img src="img/SnapLogo.png" className="logo" />
          </Link>
        </div>

        <div className="text-center pay-btn">
          <Link to="/">
          <PayPalButton className="text-center mt-5"
              amount="0.01"
              onSuccess={(details, data) => {
                console.log(details);
                console.log(data);

                // OPTIONAL: Call your server to save the transaction
                return fetch("/paypal-transaction-complete", {
                  method: "post",
                  body: JSON.stringify({
                    orderId: data.orderID
                  })
                  .then(res=>{
                    res.json();
                  })
                  .then(res=>{
                    console.log(res);
                  })
                  .catch(err=>{
                    console.log(err);
                  })

                });

              }}
              options={{
                clientId: "AW3ZFvNBLp0K92uNCALK2NTBYeaPplZgFfZpsMoQaX-ftgiia2US3ZaXicpm064A2z1p5tJezt8fD7l6"
              }}
          />
          </Link>
        </div>
      </PaymentWrapper>
    )
  }
}






const PaymentWrapper = styled.div
`
  .btn:focus,.btn:active {
    outline: none !important;
    box-shadow: none;
  }
  .logo{
    width:25rem;
    height:10rem;
  }
  .pay-btn{
    margin-top: 8rem;
  }
`

export default PaypalBtn;