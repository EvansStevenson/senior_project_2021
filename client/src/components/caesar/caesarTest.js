import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { incrementKey, decrementKey, updateModAlphabet, updateCaesarInput, checkError} from "../../actions/caesarActions";
import { setCurrentUser } from "../../actions/authActions";
import "../../componentCSS/caesarOptions.css"
import { Link, Redirect } from "react-router-dom";

class CaesarTest extends Component{
    constructor() {
        super();
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.checkEncode = this.checkEncode.bind(this);
        this.updateTestInput = this.updateTestInput.bind(this);
        this.state = {
            test1: false,
            test2: false,
            test3: false,
            test4: false
        }
    }

    increment(){
        if(this.props.caesarKey < 26){
            this.props.incrementKey();
            this.props.updateModAlphabet(this.props.caesarKey + 1);
        }
    }

    decrement(){
        if (this.props.caesarKey > 0){
            this.props.decrementKey();
            this.props.updateModAlphabet(this.props.caesarKey - 1);
        }
    }

    updateTestInput = e => {
        this.props.updateCaesarInput(e.target.value.toLowerCase());
    }

    checkEncode(answer, id){
        console.log(answer)
        console.log(this.props.testInput)
        this.props.checkError(answer, this.props.testInput, this.props.auth.user.id, id);
    }

    render(){
        let alphabet = []
        let characters = "abcdefghijklmnopqrstuvwxyz";
        for (let character of characters){
            alphabet.push(<span className="cell">{character}</span>);
        }
        let modAlphabet = []
        for(let character of this.props.caesarTest.modAlphabet){
            modAlphabet.push(<span className="cell">{character}</span>);
        }
        
        return(
            <div>
                <h1>Caesar Testing</h1> <br/><br/>
                <Link to="/caesar">Go back</Link><br/><br/>
                {alphabet}<br/><br/><br/>
                {modAlphabet}<br/><br/>
                <p><button onClick={this.decrement}>-</button>{this.props.caesarKey}<button onClick={this.increment}>+</button></p>
                <br/><br/>
                <h3>Tests</h3>
                {JSON.parse(localStorage.getItem("progress")).caesar[0] ? <span onClick={()=>{this.setState({test1: true, test2: false, test3: false, test4: false})}} className="testpass">Encode 1</span> : <span onClick={()=>{this.setState({test1: true, test2: false, test3: false, test4: false})}} className="test">Encode 1</span>}
                {JSON.parse(localStorage.getItem("progress")).caesar[1] ? <span onClick={()=>{this.setState({test1: false, test2: true, test3: false, test4: false})}} className="testpass">Encode 2</span> : <span onClick={()=>{this.setState({test1: false, test2: true, test3: false, test4: false})}} className="test">Encode 2</span>}
                {JSON.parse(localStorage.getItem("progress")).caesar[2] ? <span onClick={()=>{this.setState({test1: false, test2: false, test3: true, test4: false})}} className="testpass">Decode 1</span> : <span onClick={()=>{this.setState({test1: false, test2: false, test3: true, test4: false})}} className="test">Decode 1</span>}
                {JSON.parse(localStorage.getItem("progress")).caesar[3] ? <span onClick={()=>{this.setState({test1: false, test2: false, test3: false, test4: true})}} className="testpass">Decode 2</span> : <span onClick={()=>{this.setState({test1: false, test2: false, test3: false, test4: true})}} className="test">Decode 2</span>}

                {this.state.test1 ? <div>
                    <h3>Encode 1</h3>
                    <p>Encode this message "the treasure is under the rock" using the caesar cipher with a <span style={{color: "green"}}>key of 16</span></p>
                    <input onChange={this.updateTestInput}></input><button onClick={()=>{
                        this.checkEncode("jxu jhuqikhu yi kdtuh jxu hesa", 0);
                    }}>Submit your answer</button>
                    <p>{this.props.checkErrorMessage}</p>
                </div>: ""}

                {this.state.test2 ? <div>
                    <h3>Encode 2</h3>
                    <p>Encode this message "regroup at headquarters" using the caesar cipher with a <span style={{color: "green"}}>key of 7</span></p>
                    <input onChange={this.updateTestInput}></input><button onClick={()=>{
                        this.checkEncode("ylnyvbw ha olhkxbhyalyz", 1);
                    }}>Submit your answer</button>
                    <p>{this.props.checkErrorMessage}</p>
                </div> : ""}

                {this.state.test3 ? <div>
                    <h3>Decode 1</h3>
                    <p>Decode this message "qnatre nurnq" using the caesar cipher with a <span style={{color: "green"}}>key of 13</span></p>
                    <input onChange={this.updateTestInput}></input><button onClick={()=>{
                        this.checkEncode("danger ahead", 2);
                    }}>Submit your answer</button>
                    <p>{this.props.checkErrorMessage}</p>
                </div> : ""}

                {this.state.test4 ? <div>
                    <h3>Decode 2</h3>
                    <p>Decode this message "dahhk iu khz bneajz" using the caesar cipher with a <span style={{color: "green"}}>key of 22</span></p>
                    <input onChange={this.updateTestInput}></input><button onClick={()=>{
                        this.checkEncode("hello my old friend", 3);
                    }}>Submit your answer</button>
                    <p>{this.props.checkErrorMessage}</p>
                </div> : ""}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        caesarTest: state.caesarTest,
        caesarKey: state.caesarKey,
        auth: state.auth,
        testInput: state.caesarTestInput,
        checkErrorMessage: state.checkError
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {incrementKey: incrementKey,
        decrementKey: decrementKey,
        updateModAlphabet: updateModAlphabet,
        updateCaesarInput: updateCaesarInput,
        setCurrentUser: setCurrentUser,
        checkError: checkError}
        , dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(CaesarTest);
