import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { incrementKey, decrementKey, updateCaesarCiphertext, updateCaesarPlaintext, setDefaultText, caesarToggle, resetKey } from "../../actions/caesarActions";
import "../../componentCSS/caesarOptions.css"
import { Link } from "react-router-dom";

class CaesarOptions extends Component {
    constructor() {
        super();
        this.decrement = this.decrement.bind(this)
        this.increment = this.increment.bind(this)
        this.plainText = this.plainText.bind(this)
        this.cipherText = this.cipherText.bind(this)
        this.changeFunction = this.changeFunction.bind(this)
    }

    increment() {
        if (Number(this.props.caesarKey) < 26){
            this.props.incrementKey();
            if (this.props.caesarToggle) {
                this.props.updateCaesarCiphertext(this.props.caesarLogic.plaintext, this.props.caesarKey + 1);
            } else {
                this.props.updateCaesarPlaintext(this.props.caesarLogic.ciphertext, this.props.caesarKey + 1);
            }
        }
    }

    decrement() {
        if (this.props.caesarKey > 0){
            this.props.decrementKey();
            if (this.props.caesarToggle) {
                this.props.updateCaesarCiphertext(this.props.caesarLogic.plaintext, this.props.caesarKey - 1);
            } else {
                this.props.updateCaesarPlaintext(this.props.caesarLogic.ciphertext, this.props.caesarKey - 1);
            }
        }
    }

    plainText = e => {
        this.props.updateCaesarCiphertext(e.target.value.toLowerCase(), this.props.caesarKey);
    }

    cipherText = e => {
        this.props.updateCaesarPlaintext(e.target.value.toLowerCase(), this.props.caesarKey);
    }

    changeFunction() {
        this.props.toggle(this.props.caesarToggle)
        this.props.setDefaultText()
        this.props.resetKey()
    }

    render() {
        return (
            <div>
               

                <div className="column" style = {{borderRight: "solid black 5px"}}>
                    <h1>Caesar Cipher options</h1>  <Link to="/">Back To all Ciphers</Link>
                    <h3>About the cipher</h3>
                    <p>The Caesar cipher is one of the earliest known and simplest ciphers. It is a type of substitution cipher in which each letter in the plaintext is 'shifted' a certain number of places down the alphabet. For example, with a shift of 1, A would be replaced by B, B would become C, and so on. The method is named after Julius Caesar, who apparently used it to communicate with his generals.</p>
                    <h3>How to use</h3>
                    <p>To pass an encrypted message from one person to another, it is first necessary that both parties have the 'key' for the cipher, so that the sender may encrypt it and the receiver may decrypt it. For the caesar cipher, the key is the number of characters to shift the cipher alphabet.

                        Here is a quick example of the encryption and decryption steps involved with the caesar cipher. The text we will encrypt is 'defend the east wall of the castle', with a shift (key) of 1.<br/><br/>

                        plaintext:  defend the east wall of the castle <br/>
                        ciphertext: efgfoe uif fbtu xbmm pg uif dbtumf <br/><br/>
                        It is easy to see how each character in the plaintext is shifted up the alphabet. Decryption is just as easy, by using an offset of -1. <br/><br/>

                        plain:  abcdefghijklmnopqrstuvwxyz<br/>
                        cipher: bcdefghijklmnopqrstuvwxyza<br/><br/>
                        Obviously, if a different key is used, the cipher alphabet will be shifted a different amount.</p>
                    <Link to="/caesar/test"><button onClick={this.props.resetKey}>Test yourself!</button></Link>
                </div>
                <div className="column">
                    <h1>Example of Cipher</h1>
                    <button onClick={this.changeFunction}>{this.props.caesarToggle ? "Encode" : "Decode"}</button>
                    <h3>Input {this.props.caesarToggle ? "Plaintext" : "Ciphertext"}:
                    <input onChange={this.props.caesarLogic.active ? this.plainText : this.cipherText} /></h3>
                    <h3>Key</h3>
                    <p><button onClick={this.decrement}>-</button>{this.props.caesarKey}<button onClick={this.increment}>+</button><br/></p>
                    {this.props.caesarToggle ? this.props.caesarLogic.ciphertext : ""}
                    {this.props.caesarToggle ? "" : this.props.caesarLogic.plaintext}
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        caesarKey: state.caesarKey,
        caesarLogic: state.caesarLogic,
        caesarToggle: state.caesarToggle
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            incrementKey: incrementKey,
            decrementKey: decrementKey,
            resetKey: resetKey,
            updateCaesarCiphertext: updateCaesarCiphertext,
            updateCaesarPlaintext: updateCaesarPlaintext,
            toggle: caesarToggle,
            setDefaultText: setDefaultText
        }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(CaesarOptions);
