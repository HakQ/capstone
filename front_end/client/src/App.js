import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import "./App.css"
import Signup from "./scenes/signup.js";
import Signin from "./scenes/signin.js";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>

          <hr />

          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Signin} />
        </div>
      </Router>
    );
  }
}
  
export default App;

/***Test
    <div className="container">
        <div className="row">
          <div className="col-6 text-title">Example1</div>
          <div className="col-6">
            <span> 
              <i className="fas fa-home" />
            </span>
          </div>
        </div>
      </div>
***/