import React, { Component } from 'react';


class Signin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center p-5" >
          <div className="col-12 col-lg-6">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email"  />
              </div>
              <div class="form-group">
                <label htmlFor="exampleInputPassword">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password"/>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;