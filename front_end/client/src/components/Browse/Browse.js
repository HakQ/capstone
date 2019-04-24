import React from 'react';
import ProductList from "./ProductList.js";
import Navbar from "../Navbar.js";


class Browse extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Navbar/>
        <ProductList/>
      </React.Fragment>
    );
  }
}

export default Browse;