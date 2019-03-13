import React, {Component} from 'react';
import {Link} from "react-router-dom";
import logo from "./../static/logo.svg";
import styled from "styled-components";
import ButtonContainer from "./parts/Button.js";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        {/* https://www.iconfinder.com/icons/1243689/call_phone_icon
        Creative Commons (Attribution 3.0 Unported);
        https://www.iconfinder.com/Makoto_msk */}
        <Link to="/">
          <img src={logo} alt="Store Logo" className="mr-auto"/>
        </Link>

        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link to="/Browse" className="nav-link">
              Browse
            </Link>
          </li>
          <li className="nav-item ml-5">
            <Link to="/About" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item ml-5">
            <Link to="/Guide" className="nav-link">
              Guide
            </Link>
          </li>
          <li className="nav-item ml-5">
            <div className="dropdown">
              <Link to="profile" className="dropdown-toggle"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Account
              </Link>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link to="profile" className="dropdown-item" href="#">Profile</Link>
                <Link to="signup" className="dropdown-item" href="#">Signup</Link>
                <Link to="login" className="dropdown-item" href="#">Login</Link>
                <Link to="mysell" className="dropdown-item" href="#">My Sell</Link>
                <Link to="myorder" className="dropdown-item" href="#">My Order</Link>
              </div>
            </div>
          </li>
          <li className="nav-item ml-5">
            <Link to="/Sell" className="nav-link">
              Sell
            </Link>
          </li>
        </ul>

        <Link to="cart" className="ml-auto">
          <ButtonContainer>
            {/*from font awesome*/}
            <span className="mr-2">
              <i className="fas fa-cart-plus" />
            </span>
            <span>
              My Cart
            </span>
          </ButtonContainer>
        </Link>
      </NavWrapper> 
    );
  }
}


const NavWrapper = styled.nav
`
  background: var(--mainBlue);
  .nav-link{
    color:var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`



export default Navbar;


