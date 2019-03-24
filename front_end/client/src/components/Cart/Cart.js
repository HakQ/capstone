import React from 'react';
import {UserConsumer} from "../../UserContext.js";

class Cart extends React.Component {
  render() {
    return (
      <UserConsumer>{value=>{
        console.log(value);
        return(<h1>Hello from Cart</h1>)
      }}
      </UserConsumer>
        
    );
  }
}

export default Cart;