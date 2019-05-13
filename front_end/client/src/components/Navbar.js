import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import styled from "styled-components";
import Account from "./Account/Account.js";
import{ProductConsumer} from "../ProductContext.js";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      redirectBrowse:false
    }
  }

  change_query = (event)=>{
    this.setState({query: event.target.value});
  }

  changeRedirectTrue = (event)=>{
    this.setState({redirectBrowse: true});
  }

  changeRedirectFalse = (event)=>{
    this.setState({redirectBrowse: false});
  }

  render() {
    return (
<ProductConsumer>{value=>{return(
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        <Link to="/" className="logo" onClick={this.changeRedirectFalse}>
          <img src="img/SnapLogo.png" alt="Store Logo" className="logo-image"/>
        </Link>

        {/*This is search-bar*/}
        <form className="input-group searchBar" onSubmit={this.changeRedirectTrue}>
          <input className="form-control" type="text" placeholder="Search..." aria-label="Search" onChange={this.change_query} />
          <div className="input-group-append">
            <button type="submit" className="input-group-text lighten-3 btn-search" onClick={(event)=>{
              value.updateFromSearch(this.state.query);
            }}>
              <i className="fas fa-search text-grey" aria-hidden="true"></i>
            </button>
          </div>
        </form>

        <Link to="/Browse" className="nav-link browse">
          <button className="btn btn-secondary btn-sm" onClick={(event)=>{
          value.updateFromSearch("*");
        }}>
            Browse
          </button>
        </Link>

        <div className="account">
          <Account onClick={this.changeRedirectFalse}/>
        </div>

        {/*<!--This is cart button-->*/}
        <Link to="cart" className="goCart" onClick={this.changeRedirectFalse}>
          <ButtonContainer>
            {/*from font awesome*/}
            <span className="">
              <i className="fas fa-shopping-cart" />
              <span> Cart </span>
            </span>
          </ButtonContainer>
        </Link>

        {
          this.state.redirectBrowse?
          <Redirect to="/browse" />:
          <span></span>
        }


      </NavWrapper> 
)}}</ProductConsumer>

    );
  }
}


const NavWrapper = styled.nav
`
  height: 4rem;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap:nowrap;

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

  .logo{
    height:3em;
    width: 6em;
  }
  .logo-image{
    height:3em;
    width:100%;
  }

  .searchBar{
    font-size: 1.2em;
    width: 30em;
  }

  .browse{
    margin-right:8em;
  }

  .account{
    margin-left: 5em;
  }

  .goCart{
    width:8em;
  }

  .box{
    border: red solid 1px
  }

  .btn:focus,.btn:active {
    outline: none !important;
    box-shadow: none;
  }

  input[type="text"], textarea {
    outline: none;
    box-shadow:none !important;
    border:1px solid #ccc !important;
  }

  btn-search{
    outline: none;
    box-shadow:none !important;
    border:1px solid #ccc !important;
  }



`
const ButtonContainer = styled.button
`
  border:none;
  //margin:0.2rem 0.5rem;
  /text-transform:capitalized;
  font-size: 1.6em;
  width: 100%;
  background: transparent;
  color:var(--AmazonYellow);
  cursor:pointer;
  transition: all 0.5s ease-in-out;
  &:hover{
    background:var(--AmazonYellow);
    color:black;
    border:0.05rem solid var(--mainWhite);
    border-radius:0.5rem;
    padding: 0.2rem 0.5rem;
  }
  &:focus{
     outline:none;
  }
`
export default Navbar;





        // <ul classNameName="navbar-nav align-items-center">
        //   <li classNameName="nav-item ml-5">

        //   </li>
        //   <li classNameName="nav-item ml-5">
        //     <Link to="/About" classNameName="nav-link">
        //       About
        //     </Link>
        //   </li>
        //   <li classNameName="nav-item ml-5">
        //     <Link to="/Guide" classNameName="nav-link">
        //       Guide
        //     </Link>
        //   </li>
        //   <li classNameName="nav-item ml-5">
        //     <div classNameName="nav-link">
        //       <Account/>
        //     </div>
        //   </li>
        // </ul>



