//required React tools
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

//styling imports. bootstrap is installed through npm
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

//the components i created
import Home from "./scenes/Home.js";
import Default from "./scenes/Default.js";
import Browse from "./scenes/Browse.js";
import About from "./scenes/About.js";
import Guide from "./scenes/Guide.js";
import Profile from "./scenes/Profile.js";
import Sell from "./scenes/Sell.js";
import Cart from "./scenes/Cart.js";
import Login from "./scenes/Login.js"
import Signup from "./scenes/Signup.js"

//Sets up the routes for the project
class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/browse" component={Browse}/>
            <Route path="/about" component={About}/>
            <Route path="guide" component={Guide}/>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/profile" component={Profile} />
            <Route path="/sell" component={Sell}/>
            <Route path="/cart" component={Cart}/>
            <Route component={Default} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}
  
export default App;

