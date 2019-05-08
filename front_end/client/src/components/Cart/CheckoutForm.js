import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import {ProductConsumer} from "../../ProductContext.js";
import {Link} from "react-router-dom";
import styled from "styled-components";

class CheckoutForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      firstName:"",
      lastName:"",
      address:"",
      city:"",
      state:"",
      zipcode:"",
      phone:"",
      NameOnCard:"",
      cardNumber:"",
      expireMonth:"",
      expireYear:"",
      cvv:"",
      Billing_First:"",
      Billing_Last:"",
      Billing_Address:"",
      Billing_City:"",
      Billing_State:"",
      Billing_Country:"",
      Billing_zipcode:"",
    }
  }


  render() {
    return(
      <div> fak ja matha </div>
    )
  }
}



export default CheckoutForm;