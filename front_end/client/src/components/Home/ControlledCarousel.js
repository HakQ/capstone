import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styled from "styled-components";
import {Link} from "react-router-dom";



class ControlledCarousel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
      interval:5000
    });
  }

  render() {
    const { index, direction } = this.state;

    return (
      <CarouselWrapper  className="m-3 mt-4">
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
          interval={this.state.interval}
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="background.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <div className="text-center backgroundBehind">
                <h2 className="display-4">Best Deal You will ever find</h2>
                <p className="lead">supported by the communities all over the country to find you the best deal available!</p>
              </div>
              <div className="text-center">
                <Link to="/browse">
                  <button className="btn btn-primary">
                    <span>Shop Now</span>
                  </button>
                </Link>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="background2.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <div className="text-center backgroundBehind">
                <h2 className="display-4">Huge Sales are going on Right Now!!</h2>
                <p className="lead">Lowest price available guaranteed!</p>
              </div>
              <div className="text-center">
                <Link to="/browse">
                  <button className="btn btn-primary">
                    <span>Explore Now</span>
                  </button>
                </Link>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="background3.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <div className="text-center backgroundBehind">
                <h2 className="display-4">Shop in style</h2>
                <p className="lead">pay at its lowest</p>
              </div>
              <div className="text-center">
                <Link to="/browse">
                  <button className="btn btn-primary">
                    <span>Shop Now</span>
                  </button>
                </Link>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </CarouselWrapper>
    );
  }
}


const CarouselWrapper = styled.div
`
  
  img{
    height:40rem;
    border-radius: 0.8rem;

  }

  .backgroundBehind{
    color:black;
    background: rgba(204, 204, 204, 0.45);      
  }

  
`



export default ControlledCarousel;


