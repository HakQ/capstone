import React from 'react';
import Navbar from "../Navbar.js";
import styled from "styled-components";
import Footer from "../Footer.js"


class About extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
        <AboutWrapper className="my-3">
          <div className="jumbotron jumbotron-fluid my-4 mx-3 aboutCover d-flex">
            <div className="justify-content-center title">
              <h1 className="text-center">About Us</h1>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row justify-content-center mission">
              <div className="col-9 text-center lightText">
                <div className="py-3">
                  <h4>Who are we?</h4>
                  <p>
                    There are many people who make a living by reselling, picking up hype clothing or shoes and sell it in the market for a profit. 
                    Most people who engage in this practice are doing so through social media like facebook but there are no platform out there that are truly
                    intended for this issue. There are many instances where there are great deals in the market but are out of reach for some consumers
                    while not the other. The consumer who are available for the bargained deal could greatly enhance the well-being of those who are not
                    presented with such opportunity by reselling the products to them while also making some extra income.
                    We want to create this platform to allow the two parties to exchange great deals that occurs everyday so both parties are gain from 
                    the transaction.
                  </p>
                </div>
                <div className="py-3">
                  <h4>Our Mission</h4>
                  <p>
                    Simplify the process of retail arbitrage that anyone could pick up a great bargained deal and sell it on our platform. 
                    The buyers who truly wanted the items could also benefit from the process by getting the items on a much cheaper deal than retail price.
                  </p>
                </div>
                <div className="py-3">
                  <h4>Why use our platform?</h4>
                  <p>
                    Make reselling easy by having a platform where sellers and buyers on the platform could see the all the listed bargain deal so none will be missed out. 
                    We'll will also provide shipping and payment feature which is one of the biggest reason that
                    deters people from becoming resellers
                  </p>
                </div>
                <div className="py-3">
                  <h4>User Story</h4>
                  <p>
                    Seller just walking in the mall, shopping with family. Saw a great deal on a piece of clothing but doesn’t need it himself. Open the app and
                    scan the barcode of the clothing and take a picture then uploaded to our site. The buyer see the new flash deal that pops up and click to buy it.
                    If there is no buyers for that bargained deal then the item will be off the platform by the time the seller leaves the mall so no risk of 
                    buying the good that no one want and no storage required for the good
                  </p>
                </div>
                <div className="py-3">
                  <h4>Our Team</h4>
                </div>
                <div>
                  <div className="d-flex d-flex-placement">
                    <div class="card m-2">
                      <img src="img/qiuqun.jpg" alt="asian guy slurp burger" className="card-img-top"/>
                      <div class="card-body">
                        <p class="card-text">Qiuqun</p>
                      </div>
                    </div>
                    <div class="card m-2">
                      <img src="img/nelson.jpg" alt="asian guy slurp burger" className="card-img-top"/>
                      <div class="card-body">
                        <p class="card-text">Nelson</p>
                      </div>
                    </div>
                    <div class="card m-2">
                      <img src="img/deion.jpg" alt="asian guy slurp burger" className="card-img-top"/>
                      <div class="card-body">
                        <p class="card-text">Deion</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex d-flex-placement">
                    <div class="card m-2">
                      <img src="img/francis.jpg" alt="asian guy slurp burger" className="card-img-top"/>
                      <div class="card-body">
                        <p class="card-text">Francis</p>
                      </div>
                    </div>
                    <div class="card m-2">
                      <img src="img/blank_profile.png" alt="asian guy slurp burger" className="card-img-top"/>
                      <div class="card-body">
                        <p class="card-text">Usmaan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

  .card{
    width:18rem;
  }

  .card-img-top {
    width: 100%;
    height: 18rem;
  }

  .d-flex-placement{
    justify-content: space-evenly;
  }

  h1{
    font-size: 4rem;
  }
  h4{
    font-size: 2rem;
  }
  .aboutCover{
    background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url("img/aboutUs3.jpg");
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

