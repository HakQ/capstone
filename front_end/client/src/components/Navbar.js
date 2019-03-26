import React, {Component} from 'react';
import {Link} from "react-router-dom";
import logo from "./../static/logo.svg";
import styled from "styled-components";
import Account from "./Account/Account.js";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
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
            <div className="nav-link">
              <Account/>
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
  transition: 2s ease-in-out all;
  background: #232F3E;
  .nav-link{
    color:var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
    &:hover{
      transform: scale(1.1);
    }
  }

`
const ButtonContainer = styled.button
`
  text-transform:capitalized;
  font-size: 1.4rem;
  background: transparent;
  border:0.05rem solid var(--mainWhite);
  color:var(--AmazonYellow);
  border-radius:0.5rem;
  padding: 0.2rem 0.5rem;
  cursor:pointer;
  margin:0.2rem 0.5rem;
  transition: all 0.5s ease-in-out;
  &:hover{
    background:var(--AmazonYellow);
    color:black;
  }
  &:focus{
     outline:none;
  }
`
export default Navbar;