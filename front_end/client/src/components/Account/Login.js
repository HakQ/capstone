import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import {ProductConsumer} from "../../ProductContext.js";
import {Link} from "react-router-dom";
import styled from "styled-components";

class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    }
  }

  change_email = (event)=>{
    this.setState({email: event.target.value})
  }

  change_pw = (event)=>{
    this.setState({password: event.target.value});
  }

  render() {
    return(
      <ProductConsumer>{(value)=>{
          if(value.logged){
            return <Redirect to='/'/>
          }
          else{
            return (
              <LoginWrapper className="container mt-5">
                <div className="text-center">
                  <Link to="/">
                    <img src="img/SnapLogo.jpg" className="logo" />
                  </Link>
                </div>
                <div className="row justify-content-center p-5" >
                  <div className="col-12 col-lg-6">
                    <form onSubmit={(event)=>{
                      event.preventDefault();
                      value.handleLogin(this.state.email, this.state.password, this.state.confirm_password);
                    }}>
                      <div className="form-group">
                        <label htmlFor="InputEmail">Email address</label>
                        <input type="email" className="form-control" id="InputEmail" placeholder="Enter email" onChange={this.change_email} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="InputConfirmPassword">Password</label>
                        <input type="password" className="form-control" id="InputConfirmPassword" placeholder="Password" onChange={this.change_pw}/>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary amazon-yellow" >Login</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-6 mx-auto">
                    <p className="text-center">Not yet an user?</p>
                    <div className="text-center">
                      <Link to="/signup">
                        <button type="button" className="btn btn-secondary">Create an Account</button>
                      </Link>
                      </div>
                    </div>
                </div>
                <p className="error_Message text-center text-danger">{value.error_message}</p>
              </LoginWrapper>
          )}
      }}</ProductConsumer>

    )
  }
}

const LoginWrapper = styled.div
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

export default Login;