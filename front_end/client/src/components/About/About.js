import React from 'react';
import Navbar from "../Navbar.js";
import styled from "styled-components";
import Footer from "../Footer.js"


class About extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
        <AboutWrapper className="container-fluid my-3">
          <div className="jumbotron jumbotron-fluid my-4 mx-3 aboutCover d-flex">
            <div className="justify-content-center title">
              <h1 className="text-center">About Us</h1>
            </div>
          </div>


          <div className="row justify-content-center mission">
            <div className="col-12 text-center lightText">
              <h4>Our Mission</h4>
              <p>To enable community to deliver products at their cheapest price</p>
            </div>
          </div>
        </AboutWrapper>
        <Footer/>
      </div>
    );
  }
}
const AboutWrapper = styled.div
`
  h1{
    font-size: 4rem;
  }
  h4{
    font-size: 2rem;
  }
  .aboutCover{
    background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url("aboutUs3.jpg");
    background-repeat: no-repeat;
    display: block;
    background-size: 100% 100%;
    padding: 10rem;
    color:#f9f8fd;
    height:30rem;
    border-bottom: grey 0.05rem solid;
    justify-content: center;

    .title{
      color:black;
      background: rgba(204, 204, 204, 0.45);      
      width: 30%;
      height: 50%;
    }
  }

  .box{
    border:solid black 3px;
  }

  .lightText{
    color:gray  
  }
`

export default About;