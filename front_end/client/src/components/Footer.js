import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";


class Footer extends React.Component {
  render() {
    return (
      <FooterContainer className="container-fluid d-flex">
        <div className="mx-5 ">
          <Link to="/about" className="white">
            About
          </Link>
        </div>
        <div className="mx-5">
          <Link to="/" className="white">
            Contact Us
          </Link>
        </div>
        <div className="mx-5">
          <Link to="/guide" className="white">
            Guide
          </Link>
        </div>
        <div className="mx-5">
          <Link to="/" className="white">
            Terms Of Service
          </Link>
        </div>
      </FooterContainer>
    );
  }
}


let FooterContainer = styled.div
`
  height: 12rem;
  background: #002555;
  bottom:0;
  right:0;
  left:0;
  margin-top:30rem;
  color:white;
  font-weight: 800;

  justify-content: center;
  align-items: center;

  .white{
    color: white !important;
  }



`





export default Footer;