import React, { Component } from 'react';

class Signup extends Component {

  constructor(props) {
    super(props);
  }

  render(){ 
    return (
      <div className="container">
        <div className="row justify-content-center p-5" >
          <div className="col-12 col-lg-6">
            <form>
              <div class="form-group">
                <label for="exampleInputFirstName">First Name</label>
                <input type="first_name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="First" onChange = {this.props.onFirstChange} />
              </div>
              <div class="form-group">
                <label for="exampleInputLastName">Last Name</label>
                <input type="last_name" class="form-control" id="exampleInputPassword1" placeholder="Last" onChange = {this.props.onLastChange} />
              </div>
              <div class="form-group">
                <label for="exampleInputUsername">Username</label>
                <input type="username" class="form-control" id="exampleInputPassword1" placeholder="Username" onChange = {this.props.onUsernameChange} />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail">Email</label>
                <input type="email" class="form-control" id="exampleInputPassword1" placeholder="example@example.com" onChange = {this.props.onEmailChange} />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="******" onChange = {this.props.onPasswordChange} />
              </div>
              <button type="submit" class="btn btn-primary" onClick ={this.props.handleSignUp}>Submit</button>
            </form>

          </div>

        </div>

      </div>
    );
  }
}


export default Signup;