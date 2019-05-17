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
      redirect_paypal:false
    }
  }


  change_firsName = (event)=>{
    this.setState({firstName: event.target.value})
  }
  change_lastName = (event)=>{
    this.setState({lastName: event.target.value});
  }
  change_address = (event)=>{
    this.setState({address: event.target.value});
  }
  change_city = (event)=>{
    this.setState({city: event.target.value});
  }
  change_state=(event)=>{
    this.setState({state: event.target.value});
  }
  change_zipcode=(event)=>{
    this.setState({zipcode: event.target.value});
  }
  handleSubmit=()=>{
    console.log("submit");
  }

  redirect_paypal=()=>{
    this.setState({redirect_paypal:true});
  }

  submitForm (e) {
    e.preventDefault()
    this.props.history.push('/payment');
  }


  render(){
    return(
      <ProductConsumer>{value=>{
        if(value.goPayment){
            return <Redirect to='/payment'/>
        }
        else{

        return(
      <AddressFormWrapper className="container mt-5">
        <div className="text-center">
          <Link to="/">
            <img src="img/SnapLogo.png" className="logo" />
          </Link>
        </div>
        <div className="row justify-content-center p-5" >
          <div className="col-12 col-lg-6">
            <form onSubmit={this.submitForm.bind(this)}>
              <div className="form-group">
                <label htmlFor="InputFirstName">First Name</label>
                <input type="text" className="form-control" id="InputFirstName" aria-describedby="cityHelp" placeholder="First" onChange = {this.change_firsName} />
              </div>
              <div className="form-group">
                <label htmlFor="InputLastName">Last Name</label>
                <input type="text" className="form-control" id="InputLastName" placeholder="Last" onChange = {this.change_lastName} />
              </div>
              <div className="form-group">
                <label htmlFor="Inputaddress">Address</label>
                <input type="text" className="form-control" id="InputAddress" placeholder="Address" onChange = {this.change_address} />
              </div>
              <div className="form-group">
                <label htmlFor="InputCity">City</label>
                <input type="text" className="form-control" id="InputCity" placeholder="City" onChange = {this.change_city} />
              </div>
              <div className="form-group">
                <label htmlFor="InputState">State</label>
                <select className="form-control" id="InputState" placeholder="State" onChange = {this.change_state}>
                  <option value="select">Select A State</option>
                  <option value="AL">AL</option>
                  <option value="AK">AK</option>
                  <option value="AR">AR</option>  
                  <option value="AZ">AZ</option>
                  <option value="CA">CA</option>
                  <option value="CO">CO</option>
                  <option value="CT">CT</option>
                  <option value="DC">DC</option>
                  <option value="DE">DE</option>
                  <option value="FL">FL</option>
                  <option value="GA">GA</option>
                  <option value="HI">HI</option>
                  <option value="IA">IA</option>  
                  <option value="ID">ID</option>
                  <option value="IL">IL</option>
                  <option value="IN">IN</option>
                  <option value="KS">KS</option>
                  <option value="KY">KY</option>
                  <option value="LA">LA</option>
                  <option value="MA">MA</option>
                  <option value="MD">MD</option>
                  <option value="ME">ME</option>
                  <option value="MI">MI</option>
                  <option value="MN">MN</option>
                  <option value="MO">MO</option>  
                  <option value="MS">MS</option>
                  <option value="MT">MT</option>
                  <option value="NC">NC</option>  
                  <option value="NE">NE</option>
                  <option value="NH">NH</option>
                  <option value="NJ">NJ</option>
                  <option value="NM">NM</option>      
                  <option value="NV">NV</option>
                  <option value="NY">NY</option>
                  <option value="ND">ND</option>
                  <option value="OH">OH</option>
                  <option value="OK">OK</option>
                  <option value="OR">OR</option>
                  <option value="PA">PA</option>
                  <option value="RI">RI</option>
                  <option value="SC">SC</option>
                  <option value="SD">SD</option>
                  <option value="TN">TN</option>
                  <option value="TX">TX</option>
                  <option value="UT">UT</option>
                  <option value="VT">VT</option>
                  <option value="VA">VA</option>
                  <option value="WA">WA</option>
                  <option value="WI">WI</option>  
                  <option value="WV">WV</option>
                  <option value="WY">WY</option>
                </select>   
              </div>
              <div className="form-group">
                <label htmlFor="InputZipcode">Zip Code</label>
                <input type="text" className="form-control" id="InputZipcode" placeholder="zip code" onChange = {this.change_zipcode} />
              </div>            
              <div className="text-center">
                  <button type="submit" className="btn btn-primary amazon-yellow" onClick={(event)=>{
                    event.preventDefault();
                    value.handleSubmitAddress(this.state);
                  }}>
                    continue to payment
                  </button>
              </div>
            </form>
          </div>
        </div>

        {  
          value.goPayment?
          <Redirect to="/payment" />:
          <span></span>
        }
        
      </AddressFormWrapper>
      )}}}</ProductConsumer>
    )
  }
     
}


const AddressFormWrapper = styled.div
`
  .btn:focus,.btn:active {
    outline: none !important;
    box-shadow: none;
  }
  .logo{
    width:25rem;
    height:10rem;
  }
`


export default CheckoutForm;



