import React from 'react';
import Navbar from "../Navbar.js";
import styled from "styled-components";
import {Link} from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
        <HomeWrapper>
          {/*<!--This is the cover part of the home page which will lead to browse page-->*/}
          <div className="jumbotron my-4 mx-3 cover">
            <div className="text-center">
              <h2 className="display-4">Best Deal You will ever find</h2>
              <p className="lead">supported by the communities all over the country to find you the best deal out there!</p>
            </div>
            <div className="text-center">
              <Link to="/browse">
                <button className="btn btn-primary">
                  <span>Shop Now</span>
                </button>
              </Link>
            </div>
          </div>

          {/*<!--about us message which will lead to about page-->*/}
          <div className="about my-5 d-flex">
              <div>
                <h2 className="text-center">What are we all about?</h2>
                <p className="text-center mx-5 my-2">
                  As common shoppers, we see great deals for products all the time. 
                  There are items that have huge discount that we just can't pass up on.
                  However, we may not necessarily need those items due to many reasons such as already have it.
                  But there are people who desperately needed that item or will appriciate having access to that item on such a low cost 
                  which they do not have access to. Our goal is to connect these deals from people to people so everyone could have access to
                  great products at a margin cost.
                </p>
                <div className="text-center">
                  <Link to="/about">
                    <button className="btn btn-primary">
                      <span>About us</span>
                    </button>
                  </Link>
                </div>
              </div>
          </div>

          {/*<!--how to become a seller, go to guide-->*/}
          <div className="guide jumbotron my-4 mx-3">
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <h2>Become a Seller</h2>
                  <p>
                    You can work with us to shares all the 
                    great deals you found with your fellow 
                    shoppers who may be interested.
                    Also, you can earn some extra money while you at it. 
                    Just share the items that you think may be on a 
                    great deal and we will 
                    take care of the rest! 
                  </p>
                  <div>
                    <Link to="/guide">
                      <button className="btn btn-primary">
                        <span>Become a Seller</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HomeWrapper>
      </div>
    );
  }
}

const HomeWrapper = styled.div
`
  .cover{
    background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url("background.jpg");
    background-repeat: no-repeat;
    display: block;
    background-size: 100% 100%;
    padding: 10rem;
    color:#f9f8fd;
    border-bottom: grey 0.25rem solid;
  }

  .about{
    height: 20rem;
    align-items: center;
  }

  .guide{
    background-image: url("doggyShip.jpg");
    background-repeat: no-repeat;
    display: block;
    background-size: 100% 100%;
    padding: 8rem;
  }

  .box{
    border: solid black 1px;
  }
`

export default Home;