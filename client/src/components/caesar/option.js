import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { incrementKey, decrementKey, updateCaesarCiphertext, updateCaesarPlaintext, setDefaultText, caesarToggle} from "../../actions/caesarActions";


// import { Link , withRouter} from "react-router-dom";
// import PropTypes from "prop-types";
// import { incrementKey } from "../../actions/caesarActions";

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
        this.props.incrementKey();
        if(this.props.caesarToggle){
            this.props.updateCaesarCiphertext(this.props.caesarLogic.plaintext, this.props.caesarKey + 1);
        }else{
            this.props.updateCaesarPlaintext(this.props.caesarLogic.ciphertext, this.props.caesarKey + 1);
        }
    }

    decrement() {
        this.props.decrementKey();
        if(this.props.caesarToggle){
            this.props.updateCaesarCiphertext(this.props.caesarLogic.plaintext, this.props.caesarKey - 1);
        }else{
            this.props.updateCaesarPlaintext(this.props.caesarLogic.ciphertext, this.props.caesarKey - 1);
        }
    }

    plainText = e => {
       this.props.updateCaesarCiphertext(e.target.value.toLowerCase(), this.props.caesarKey);
    }

    cipherText = e =>{
        this.props.updateCaesarPlaintext(e.target.value.toLowerCase(), this.props.caesarKey);
    }

    changeFunction(){   
        this.props.toggle(this.props.caesarToggle)
        this.props.setDefaultText()
    }

    render() {
        return (
            <div>
                Caesar options <br />
                <p><button onClick={this.decrement}>-</button>{this.props.caesarKey}<button onClick={this.increment}>+</button> 
                <button onClick={this.changeFunction}>{this.props.caesarToggle ? "Encode" : "Decode"}</button><br/></p>
                Input {this.props.caesarToggle ? "Plaintext" : "Ciphertext"}:
                <input onChange={this.props.caesarLogic.active ? this.plainText : this.cipherText} />
                {this.props.caesarToggle ? this.props.caesarLogic.ciphertext : ""}
                {this.props.caesarToggle ? "" : this.props.caesarLogic.plaintext}

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
        { incrementKey: incrementKey,
        decrementKey: decrementKey,
        updateCaesarCiphertext: updateCaesarCiphertext,
        updateCaesarPlaintext: updateCaesarPlaintext,
        toggle: caesarToggle,
        setDefaultText: setDefaultText
        }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(CaesarOptions);
