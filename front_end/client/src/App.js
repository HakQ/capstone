//required React tools
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

//styling imports. bootstrap is installed through npm
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./static/styleCSS/App.css";

//the components i created
import Navbar from "./components/Navbar.js";
import Home from "./components/Home/Home.js";
import Default from "./components/Default/Default.js";
import Browse from "./components/Browse/Browse.js";
import About from "./components/About/About.js";
import Guide from "./components/Guide/Guide.js";
import Profile from "./components/Account/Profile.js";
import MySell from "./components/Account/MySell.js";
import MyOrder from "./components/Account/MyOrder.js";
import Login from "./components/Account/Login.js"
import Signup from "./components/Account/Signup.js"
import Sell from "./components/Sell/Sell.js";
import Cart from "./components/Cart/Cart.js";
import Detail from "./components/Browse/Detail.js";

import {UserProvider} from "./UserContext.js";
import {ProductProvider} from "./ProductContext.js";

//Sets up the routes for the project
class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <UserProvider>
        <ProductProvider>
          <Router>
            <React.Fragment>
              <Navbar/>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/browse" component={Browse}/>
                <Route path="/about" component={About}/>
                <Route path="/guide" component={Guide}/>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/profile" component={Profile} />
                <Route path="/mysell" component={MySell} />
                <Route path="/myorder" component={MyOrder} />
                <Route path="/sell" component={Sell}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/detail" component={Detail}/>
                <Route component={Default} />
              </Switch>
            </React.Fragment>
          </Router>
        </ProductProvider>
      </UserProvider>
    );
  }
}
  
export default App;

