import React, { Component } from 'react';
import {UserConsumer} from "../../UserContext.js";
import { Redirect } from 'react-router-dom';
import {Link} from "react-router-dom";
import styled from "styled-components";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirm_password:"",
      username:"",
      firstname:"",
      lastname:""
    }
  }

  change_email = (event)=>{
    this.setState({email: event.target.value})
  }
  change_pw = (event)=>{
    this.setState({password: event.target.value});
  }
  change_pw_confirm = (event)=>{
    this.setState({confirm_password: event.target.value});
  }
  change_username = (event)=>{
    this.setState({username: event.target.value});
  }
  change_first=(event)=>{
    this.setState({firstname: event.target.value});
  }
  change_last=(event)=>{
    this.setState({lastname: event.target.value});
  }

  render(){
    return(
      <UserConsumer>{(value)=>{
        if(value.logged){
          return <Redirect to='/'/>
        }
        else{
          return(
            <React.Fragment>
              <SignupWrapper className="container">
                <div className="row justify-content-center p-5" >
                  <div className="col-12 col-lg-6">
                    <form onSubmit={(event)=>{
                      event.preventDefault();
                      value.handleSignup(this.state)}}>
                      <div className="form-group">
                        <label htmlFor="InputFirstName">First Name</label>
                        <input type="first_name" className="form-control" id="InputFirstName" aria-describedby="emailHelp" placeholder="First" onChange = {this.change_first} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="InputLastName">Last Name</label>
                        <input type="last_name" className="form-control" id="InputLastName" placeholder="Last" onChange = {this.change_last} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="InputUsername">Username</label>
                        <input type="username" className="form-control" id="InputUsername" placeholder="Username" onChange = {this.change_username} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="InputEmail">Email</label>
                        <input type="email" className="form-control" id="InputEmail" placeholder="example@mail.com" onChange = {this.change_email} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="InputPassword">Password</label>
                        <input type="password" className="form-control" id="InputPassword" placeholder="******" onChange = {this.change_pw} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="InputPassword_confirm">Confirm Password</label>
                        <input type="password" className="form-control" id="InputPassword_confirm" placeholder="******" onChange={this.change_pw_confirm}/>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary amazon-yellow">Submit</button>
                      </div>
                    </form>
                    <p className="text-center">Already have an account?</p>
                    <div className="text-center">
                      <Link to="/login">
                        <button type="button" className="btn btn-secondary">Login Here</button>
                      </Link>
                    </div>
                    <p className="error_Message text-center text-danger">{value.error_message}</p>
                  </div>
                </div>
              </SignupWrapper>
            </React.Fragment>
        )}
      }}</UserConsumer>
    )
  }
}


const SignupWrapper = styled.div
`
  .btn:focus,.btn:active {
    outline: none !important;
    box-shadow: none;
  }
`


export default Signup;

  