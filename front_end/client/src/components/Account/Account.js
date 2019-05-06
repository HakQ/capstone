import React from 'react';
import {Link} from "react-router-dom";
import {UserConsumer} from "../../UserContext.js";
import styled from "styled-components";

 
class Account extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <AccountWrapper className="dropdown full-size;">
        <UserConsumer>{(value) =>{return(
          <div>
            {
              value.logged
                ?(
                  <div> 
                    <Link to="profile" className="dropdown-toggle no-link grow"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span><i className="fas fa-user make-bigger"/></span>
                      <span><i className="fas fa-arrow-down" style={{"font-size":"0.8em"}}></i></span>
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" >
                      <div className="text-center">
                        <Link to="profile" className="dropdown-item" href="#">Profile</Link>
                        <Link to="mysell" className="dropdown-item" href="#">My Sell</Link>
                        <Link to="myorder" className="dropdown-item" href="#">My Order</Link>
                        <button className="no-design" onClick={value.handleLogout}>Logout</button>
                      </div>
                    </div>
                  </div>
                )
                :(
                  <div>
                    <Link to="signup" className="white" href="#">Signup</Link>
                    <span className="white"> // </span>
                    <Link to="login" className="white" href="#">Login</Link>
                  </div>
                )
            }
          </div>
        )}}</UserConsumer>
      </AccountWrapper>
     )
   }
}
 
const AccountWrapper = styled.div
`
  .white{
    color: white !important;
  }

  .box{
    border: solid black 1px;
  }
  .no-design{
    border: none;
    background-color: transparent;
  }

  .make-bigger{
    font-size:1.4rem;
  }

  .full-size{
    height: 100%;
    width:100%;
  }

`

export default Account;
