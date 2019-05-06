import React, { Component } from 'react';
import {UserConsumer} from "../../UserContext.js";
import { Redirect } from 'react-router-dom';
import {Link} from "react-router-dom";
import styled from "styled-components";


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
     code:""
    }
  }

  change_code=(event)=>{
    this.setState({code: event.target.value});
  }

  render(){
    return(
      <UserConsumer>{(value)=>{
        // value.handleSignUpConfirm("182881");
        if(value.logged){
          return <Redirect to='/'/>
        }

        return(
          <SignupWrapper className="container mt-5">
            <div className="text-center">
              <Link to="/">
                <img src="img/SnapLogo.jpg" className="logo" />
              </Link>
            </div>
            <div className="row justify-content-center p-5" >
              <div className="col-12 col-lg-6">
                <form onSubmit={(event)=>{
                  event.preventDefault();
                  value.handleSignUpConfirm(this.state.code)}}>
                  <div className="form-group">
                      <label htmlFor="confirmCode" className="font-weight-bold">Confirmation Code</label>
                      <input type="first_name" className="form-control" id="confirmCode" placeholder="*****" onChange = {this.change_code} />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary amazon-yellow">Confirm</button>
                  </div>
                </form>
                <p className="text-center text-secondary">Check your email for confirmation code</p>
              </div>
            </div>
          </SignupWrapper>

        );  
      }}</UserConsumer>
    )
  }

}


const SignupWrapper = styled.div
`
  .logo{
    width:25rem;
    height:10rem;
  }

`


export default Signup;

  