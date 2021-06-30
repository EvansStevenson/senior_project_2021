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
          <div className='tile'>Playfair</div>
          <div className='tile'>Columnar</div>
          <div className='tile'>Rail Fence</div>
         <div className='tile'>Vigenère</div>
          <div className='tile'>Four-Square</div>
        </div>
      </div>
    );
  }
}

export default Landing;
