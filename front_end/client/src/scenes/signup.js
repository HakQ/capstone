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
              <div className="form-group">
                <label htmlFor="exampleInputFirstName">First Name</label>
                <input type="first_name" className="form-control" id="exampleInputFirstName" aria-describedby="emailHelp" placeholder="First" onChange = {this.props.onFirstChange} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputLastName">Last Name</label>
                <input type="last_name" className="form-control" id="exampleInputLastName" placeholder="Last" onChange = {this.props.onLastChange} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputUsername">Username</label>
                <input type="username" className="form-control" id="exampleInputUsername" placeholder="Username" onChange = {this.props.onUsernameChange} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail">Email</label>
                <input type="email" className="form-control" id="exampleInputEmail" placeholder="example@example.com" onChange = {this.props.onEmailChange} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword" placeholder="******" onChange = {this.props.onPasswordChange} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>

          </div>

        </div>

      </div>
    );
  }
}


export default Signup;