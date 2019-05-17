import React from 'react';
import Navbar from "../Navbar.js";
import styled from "styled-components";
import Footer from "../Footer.js"


class Guide extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
        <GuideWrapper className="my-3">
          <div className="jumbotron jumbotron-fluid my-4 mx-3 guideCover d-flex">
            <div className="justify-content-center title">
              <h1 className="text-center">Reseller Guide</h1>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row justify-content-center mission">
              <div className="col-9 text-center lightText">
                <div className="py-3">
                  <h4>The Rise of the Side Hustle</h4>
                  <p>
                    Making a living today is extremely difficult. That being said it is safe to say the vast majority of people could use some extra cash.
                    The slang term “Side Hustle” refers to another income earning opportunity aside from your main source of income. 
                    This app will help people struggling to engage in retail arbitrage (reselling items you found at a store for cheap)  to make extra cash 
                    People will turn everyday deals they find into cash earning opportunities.
                    People living paycheck to paycheck can get some extra cash to spend on thing like going out to eat or new clothes for their kids.
                  </p>
                </div>
                <div className="py-3">
                  <h4>How does one become a reseller?</h4>
                  <ol className="text-left mx-5">
                    <li>Scan an item you see on sale/clearance</li>
                    <li>The in app tool will determine if the deal is worth posting (compare sale price+profit+shipping to current market prices).</li>
                    <li>Set the time you will be in the store (Min:45 minute Max:2 hours)</li>
                    <li>Put it in your cart and continue your shopping</li>
                    <li>If the item is sold on the app purchase the item and we will email you a label to ship it out . If not,simply put the item back nothing gained nothing lost</li>
                  </ol>
                </div>
                 </div>
            </div>
          </div>
        </GuideWrapper>
        <Footer/>
      </div>
    );
  }
}
const GuideWrapper = styled.div
`

  .backgroundBehind{
    color:black;
    background: rgba(204, 204, 204, 0.45);      
  }

  h1{
    font-size: 4rem;
  }
  h4{
    font-size: 2rem;
  }
  .guideCover{
    background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url("img/stores.jpg");
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
      background: rgba(255, 255, 255, 0.45);      
      width: 30%;
      height: 100%;
    }
  }

  .box{
    border:solid black 3px;
  }

  .lightText{
    color:gray  
  }

`

export default Guide;