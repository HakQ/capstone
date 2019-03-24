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
      <AccountWrapper className="dropdown">
        <Link to="profile" className="dropdown-toggle no-link grow"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Account
        </Link>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <UserConsumer>

            { (value) => {
              return(
              <div>
              {
                value.logged?
                (<div>
                  <Link to="profile" className="dropdown-item" href="#">Profile</Link>
                  <Link to="mysell" className="dropdown-item" href="#">My Sell</Link>
                  <Link to="myorder" className="dropdown-item" href="#">My Order</Link>
                  <button onClick={value.handleLogout}>Logout</button>
                </div>):
                (<div>
                  <Link to="signup" className="dropdown-item" href="#">Signup</Link>
                  <Link to="login" className="dropdown-item" href="#">Login</Link>
                </div>)
              }
              </div>
              )}
            }
          </UserConsumer>
        </div>
      </AccountWrapper>
     )
   }
}
 
const AccountWrapper = styled.div
`
`

export default Account;
