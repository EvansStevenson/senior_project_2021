import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {updateKey, updatePlayfairTestInput, checkPlayfairAnswer} from "../../actions/playfairActions";
import { setCurrentUse } from "../../actions/authActions";
import "../../componentCSS/caesarOptions.css"
import { Link, Redirect } from "react-router-dom";

class PlayfairTest extends Component{
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
        this.props.updateKey(e.target.value, this.props.playfairExampleText)
    }
    
    updateTestInput = e => {
        this.props.updatePlayfairTestInput(e.target.value.toUpperCase());
    }

    checkEncode(answer, id){
        this.props.checkPlayfairAnswer(answer, this.props.playfairTestInput, this.props.auth.user.id, id);
    }

    render(){
        let key = this.props.playfairExampleText.key;
        let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"
        key = key.toUpperCase()
        key = key.replace(/\s+/g, '');
        //remove duplicate characters (solution found at https://www.codegrepper.com/code-examples/javascript/how+to+remove+duplicate+characters+from+string+in+javascript)
        key = key
        .split('')
        .filter(function(item, pos, self) {
          return self.indexOf(item) == pos;
        })
        .join('');
        //add the rest of the alphabet
        for(let i = 0; i < alphabet.length; i++){
            if(key.includes(alphabet[i]) === false){
                key += alphabet[i];
            }
        }
        //make keysquare 
        let keysquare = []
        for (let i = 0; i < key.length; i += 5) {
            let temp = [<span className="cell">{key[i]}</span>, 
            <div className="cell">{key[i + 1]}</div>, 
            <div className="cell">{key[i + 2]}</div>, 
            <div className="cell">{key[i + 3]}</div>, 
            <div className="cell">{key[i + 4]}</div>, 
            <br/>, <br/>]
            keysquare.push(temp);   
        }
        return(
            <div>
                <h1>Caesar Testing</h1> <br/><br/>
                <Link to="/playfair">Go back</Link><br/><br/>
                Enter Key: <input onChange={this.updateKeySquare}></input>
                <p id="playfairTestKey"></p>
                {keysquare}
                <h3>Tests</h3>
                {JSON.parse(localStorage.getItem("progress")).playfair[0] ? <span onClick={()=>{this.setState({test1: true, test2: false, test3: false, test4: false})}} className="testpass">Encode 1</span> : <span onClick={()=>{this.setState({test1: true, test2: false, test3: false, test4: false})}} className="test">Encode 1</span>}
                {JSON.parse(localStorage.getItem("progress")).playfair[1] ? <span onClick={()=>{this.setState({test1: false, test2: true, test3: false, test4: false})}} className="testpass">Encode 2</span> : <span onClick={()=>{this.setState({test1: false, test2: true, test3: false, test4: false})}} className="test">Encode 2</span>}
                {JSON.parse(localStorage.getItem("progress")).playfair[2] ? <span onClick={()=>{this.setState({test1: false, test2: false, test3: true, test4: false})}} className="testpass">Decode 1</span> : <span onClick={()=>{this.setState({test1: false, test2: false, test3: true, test4: false})}} className="test">Decode 1</span>}
                {JSON.parse(localStorage.getItem("progress")).playfair[3] ? <span onClick={()=>{this.setState({test1: false, test2: false, test3: false, test4: true})}} className="testpass">Decode 2</span> : <span onClick={()=>{this.setState({test1: false, test2: false, test3: false, test4: true})}} className="test">Decode 2</span>}

                {this.state.test1 ? <div>
                    <h3>Encode 1</h3>
                    <p>Encode this message "we are discovered" using the playfair cipher with a <span style={{color: "green"}}>key of "danger"</span></p>
                    <input onChange={this.updateTestInput}></input><button onClick={()=>{
                        this.checkEncode("ZADBDALPHLZDHDNV", 0);
                    }}>Submit your answer</button>
                    <p>{this.props.playfairCheck}</p>
                </div>: ""}

                {this.state.test2 ? <div>
                    <h3>Encode 2</h3>
                    <p>Encode this message "the clear path is never the right one" using the playfair cipher with a <span style={{color: "green"}}>key of "onward"</span></p>
                    <input onChange={this.updateTestInput}></input><button onClick={()=>{
                        this.checkEncode("PLFEKFROSNPLKQABYBFZKBWLHIMRAB", 1);
                    }}>Submit your answer</button>
                    <p>{this.props.playfairCheck}</p>
                </div> : ""}

                {this.state.test3 ? <div>
                    <h3>Decode 1</h3>
                    <p>Decode this message "ZPULRXBTAZPURAMPHKAZ" using the playfair cipher with a <span style={{color: "green"}}>key of "roadtrip"</span></p>
                    <input onChange={this.updateTestInput}></input><button onClick={()=>{
                        this.checkEncode("WELEAVEATXENTONIGHTX", 2);
                    }}>Submit your answer</button>
                    <p>{this.props.playfairCheck}</p>
                </div> : ""}

                {this.state.test4 ? <div>
                    <h3>Decode 2</h3>
                    <p>Decode this message "NMWAHOVKTSOMKPDO" using the playfair cipher with a <span style={{color: "green"}}>key of "rewards"</span></p>
                    <input onChange={this.updateTestInput}></input><button onClick={()=>{
                        this.checkEncode("THEWINXINGTICKET", 3);
                    }}>Submit your answer</button>
                    <p>{this.props.playfairCheck}</p>
                </div> : ""}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        playfairExampleText: state.playfairExampleText,
        auth: state.auth,
        playfairTestInput: state.playfairTestInput,
        playfairCheck: state.playfairCheck

    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {updateKey: updateKey,
        updatePlayfairTestInput: updatePlayfairTestInput,
        checkPlayfairAnswer: checkPlayfairAnswer}
        , dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(PlayfairTest);
