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
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"  />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Signin;