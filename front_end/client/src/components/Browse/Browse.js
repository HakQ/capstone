import React from 'react';
import ProductList from "./ProductList.js";
import Navbar from "../Navbar.js";
import Footer from "../Footer.js"


class Browse extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Navbar/>
        <ProductList/>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default Browse;