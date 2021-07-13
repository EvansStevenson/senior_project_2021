import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../componentCSS/landing.css";

class Landing extends Component {
  render() {
    return (
      <div>
        <h1>Cipher Exploration</h1> 
        <div class='landingTiles'>
          <Link to="/caesar" className='tile'>Caesar</Link>
          <Link to="/playfair" className='tile'>Playfair</Link>
          <Link to="/columnar" className='tile'>Columnar</Link>
          <Link to="/railfence" className='tile'>Rail Fence</Link>
         <Link to="/vigenere" className='tile'>Vigenère</Link>
          <Link to="/foursquare" className='tile'>Four-Square</Link>
        </div>
      </div>
    );
  }
}

export default Landing;
