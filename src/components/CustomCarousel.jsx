import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

class DemoCarousel extends Component {
  render() {
    return (
      <div
        style={{ position: "fixed", width: "100%", height: "100%", zIndex: -1 }}
      >
        <Carousel>
          <div>
            <img
              src={this.props.img}
              style={{ width: "50%", height: "50%", objectFit: "cover" }}
            />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img src="assets/2.jpeg" />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img src="assets/3.jpeg" />
            <p className="legend">Legend 3</p>
          </div>
        </Carousel>
      </div>
    );
  }
}

export default DemoCarousel;
