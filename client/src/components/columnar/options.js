import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateKey, updatePlaintext, updateCiphertext, encryptPlaintext, decryptCiphertext} from "../../actions/columnarActions";
import "../../componentCSS/caesarOptions.css"
import { Link } from "react-router-dom";

class CaesarOptions extends Component {
    constructor() {
        super();
        this.key = this.key.bind(this);
        this.plaintext = this.plaintext.bind(this);
        this.encrypt = this.encrypt.bind(this);
        this.ciphertext = this.ciphertext.bind(this);
        this.decrypt = this.decrypt.bind(this);
    }

    key = e => {
        this.props.updateKey(e.target.value.toLowerCase(), this.props.columnarExampleText)
    }

    plaintext = e => {
        this.props.updatePlaintext(e.target.value.toLowerCase(), this.props.columnarExampleText)
    }

    ciphertext = e => {
        this.props.updateCiphertext(e.target.value.toLowerCase(), this.props.columnarExampleText)
    }

    encrypt(){
        this.props.encryptPlaintext(this.props.columnarExampleText)
    }

    decrypt(){
        this.props.decryptCiphertext(this.props.columnarExampleText)
    }

    render() {
        return (
            <div>
                <div className="column" style = {{borderRight: "solid black 5px"}}>
                    <h1>Columnar Cipher options</h1>  <Link to="/">Back To all Ciphers</Link>
                    <h3>About the cipher</h3>
                    <p></p>
                    <h3>How to use</h3>
                    <p></p>
                    <Link to="/columnar/test"><button>Test yourself!</button></Link>
                </div>
                <div className="column">
                    <h1>Example of Cipher</h1>
                    <h3>Key</h3>
                    Input cipher key: <input onChange={this.key}></input><br/>
                    Plain text: <input id="plaintextInput" onChange={this.plaintext}></input><button onClick={() => {
                        this.encrypt(); 
                        document.getElementById("cipherInput").value = this.props.columnarExampleText.ciphertext;
                    }}>Encrypt</button><br/>
                    Cipher text: <input id="cipherInput" onChange={this.ciphertext}></input><button onClick={() => {
                        this.decrypt();
                        document.getElementById("plaintextInput").value = this.props.columnarExampleText.plaintext;
                    }}>Decrypt</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        columnarExampleText: state.columnarExampleText
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {updateKey: updateKey,
        updatePlaintext: updatePlaintext,
        updateCiphertext: updateCiphertext,
        encryptPlaintext: encryptPlaintext, 
        decryptCiphertext: decryptCiphertext},
        dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(CaesarOptions);
