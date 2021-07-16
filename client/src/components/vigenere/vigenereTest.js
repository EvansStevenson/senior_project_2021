import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { } from "../../actions/vigenereActions";
import { setCurrentUser } from "../../actions/authActions";
import "../../componentCSS/caesarOptions.css"
import { Link, Redirect } from "react-router-dom";

class VigenereTest extends Component{
    constructor() {
        super();
        this.updateKeySquare = this.updateKeySquare.bind(this);
        this.checkEncode = this.checkEncode.bind(this);
        this.updateTestInput = this.updateTestInput.bind(this);
        this.state = {
            test1: false,
            test2: false,
            test3: false,
            test4: false
        }
    }

    updateKeySquare = e =>{

    }
    
    updateTestInput = e => {
        // this.props.updateCaesarInput(e.target.value.toLowerCase());
    }

    checkEncode(answer, id){
        // console.log(answer)
        // console.log(this.props.testInput)
        // this.props.checkError(answer, this.props.testInput, this.props.auth.user.id, id);
    }

    render(){
        
        return(
            <div>
                <h1>Caesar Testing</h1> <br/><br/>
                <Link to="/caesar">Go back</Link><br/><br/>
                
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
        {}
        , dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(VigenereTest);
