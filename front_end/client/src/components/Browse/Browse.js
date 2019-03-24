import React from 'react';
import ProductList from "./ProductList.js";

class Browse extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <ProductList/>
      </React.Fragment>
    );
  }
}

export default Browse;