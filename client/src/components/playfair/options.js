import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updatePlaintext, updateCiphertext, updateKey, encryptPlaintext, decryptCiphertext, defaultplayfairText} from "../../actions/playfairActions";
import "../../componentCSS/caesarOptions.css"
import { Link } from "react-router-dom";


class PlayfairOptions extends Component {
    constructor() {
        super();
        this.key = this.key.bind(this);
        this.plainText = this.plainText.bind(this);
        this.cipherText = this.cipherText.bind(this);
        this.encrypt = this.encrypt.bind(this);
        this.decrypt = this.decrypt.bind(this);
    }
 
    key = e  => {
        this.props.updateKey(e.target.value.toLowerCase(), this.props.playfairExampleText)
    }

    plainText = e => {
        this.props.updatePlaintext(e.target.value.toLowerCase(), this.props.playfairExampleText)
    }

    cipherText = e => {
        this.props.updateCiphertext(e.target.value.toLowerCase(), this.props.playfairExampleText)
    }

    encrypt(){
        this.props.encryptPlaintext(this.props.playfairExampleText)
    }

    decrypt(){
        this.props.decryptCiphertext(this.props.playfairExampleText)
    }

    render() {
        return (
            <div>
                <div className="column" style={{ borderRight: "solid black 5px" }}>
                    <h1>Playfair Cipher options</h1>  <Link to="/">Back To all Ciphers</Link>
                    <h3>About the cipher</h3>
                    <p></p>
                    <h3>How to use</h3>
                    <Link to="/playfair/test"><button onClick={() => {this.props.defaultplayfairText()}}>Test yourself!</button></Link>
                </div>
                <div className="column">
                    <h1>Example of Cipher</h1>
                    <h3>Key</h3>
                    Input cipher key: <input onChange={this.key}></input><br/>
                    note: cannot contain duplicate letters or contain the letter 'j'<br/>
                    Plain text: <input id="plaintextInput" onChange={this.plainText}></input><button onClick={() => {
                        this.encrypt(); 
                        document.getElementById("cipherInput").value = this.props.playfairExampleText.ciphertext;
                    }}>Encrypt</button><br/>
                    Cipher text: <input id="cipherInput" onChange={this.cipherText}></input><button onClick={() => {
                        this.decrypt();
                        document.getElementById("plaintextInput").value = this.props.playfairExampleText.plaintext;
                    }}>Decrypt</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        playfairExampleText: state.playfairExampleText
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            updatePlaintext: updatePlaintext,
            updateCiphertext: updateCiphertext,
            updateKey: updateKey,
            encryptPlaintext: encryptPlaintext,
            decryptCiphertext: decryptCiphertext,
            defaultplayfairText: defaultplayfairText
        }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(PlayfairOptions);
