import React, { Component } from "react";
//import { Link } from "react-router-dom";

import "../../componentCSS/landing.css";

class Landing extends Component {
  render() {
    return (
      <div>
        <h1>Cipher Exploration</h1> 
        <div class='landingTiles'>
          <div class='tile'>Caesar</div>
          <div class='tile'>Playfair</div>
          <div class='tile'>Columnar</div>
          <div class='tile'>Rail Fence</div>
          <div class='tile'>Vigenère</div>
          <div class='tile'>Four-Square</div>
        </div>
      </div>
    );
  }
}

export default Landing;
