import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { } from "../../actions/vigenereActions";
import "../../componentCSS/caesarOptions.css"
import { Link } from "react-router-dom";

class CaesarOptions extends Component {
    constructor() {
        super();
        // this.decrement = this.decrement.bind(this)
    }

    render() {
        return (
            <div>
                <div className="column" style = {{borderRight: "solid black 5px"}}>
                    <h1>Vigenere Cipher options</h1>  <Link to="/">Back To all Ciphers</Link>
                    <h3>About the cipher</h3>
                    <p></p>
                    <h3>How to use</h3>
                    <p></p>
                    <Link to="/vigenere/test"><button>Test yourself!</button></Link>
                </div>
                <div className="column">
                    <h1>Example of Cipher</h1>
                    <h3>Key</h3>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(CaesarOptions);
