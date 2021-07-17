import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateKey, updateColumnarInput, checkColumnarAnswer} from "../../actions/columnarActions";
import { setCurrentUser } from "../../actions/authActions";
import "../../componentCSS/caesarOptions.css"
import { Link, Redirect } from "react-router-dom";

class ColumnarTest extends Component {
    constructor() {
        super();
        this.checkEncode = this.checkEncode.bind(this);
        this.updateTestInput = this.updateTestInput.bind(this);
        this.updateKeySquare = this.updateKeySquare.bind(this);
        this.state = {
            test1: false,
            test2: false,
            test3: false,
            test4: false,
            plaintext: ""
        }
    }

    updateKeySquare = e =>{
        this.props.updateKey(e.target.value, this.props.columnarExampleText)
    }

    updateTestInput = e => {
        this.props.updateColumnarInput(e.target.value.toLowerCase());
    }

    checkEncode(answer, id) {
        this.props.checkColumnarAnswer(answer, this.props.columnarTestInput, this.props.auth.user.id, id);
    }

    render() {
    let key = this.props.columnarExampleText.key;
    if (key !== ""){
        key = key.replace(/\s+/g, '');
        key = key
        .split('')
        .filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
        })
        .join('');
    }else{
        key = "enterkey"
    }
    let plaintext = this.state.plaintext;
    
    //key boxes
    let printKey = [];
    for (let i = 0; i < key.length; i++){
        printKey.push(<div className="cell">{key[i]}</div>)
    }

    let decodeHelp = [];
    let rows = plaintext.length / key.length;
    for (let i = 0; i < rows; i++){
        for (let i = 0; i < key.length; i++){
            decodeHelp.push(<input className="cell"></input>)
        }
        decodeHelp.push(<br/>,<br/>)
    } 

        return (
            <div>
                <div className="column">
                    <h1>Columnar Testing</h1> <br /><br />
                    <Link to="/columnar">Go back</Link><br /><br />
                    Input Key: <input onChange={this.updateKeySquare}></input><br/><br/>
                    <h3>Columnar helper</h3>
                    {printKey} <br/><br/><br/> 
                    {decodeHelp}
                </div>
                <div className="column">
                    <h3>Tests</h3>
                    {JSON.parse(localStorage.getItem("progress")).columnar[0] ? <span onClick={() => { this.setState({ test1: true, test2: false, test3: false, test4: false, plaintext: "thelastday" }) }} className="testpass">Encode 1</span> : <span onClick={() => { this.setState({ test1: true, test2: false, test3: false, test4: false, plaintext: "thelastday" }) }} className="test">Encode 1</span>}
                    {JSON.parse(localStorage.getItem("progress")).columnar[1] ? <span onClick={() => { this.setState({ test1: false, test2: true, test3: false, test4: false, plaintext: "dontforgettolockthedoor"}) }} className="testpass">Encode 2</span> : <span onClick={() => { this.setState({ test1: false, test2: true, test3: false, test4: false, plaintext: "dontforgettolockthedoor" }) }} className="test">Encode 2</span>}
                    {JSON.parse(localStorage.getItem("progress")).columnar[2] ? <span onClick={() => { this.setState({ test1: false, test2: false, test3: true, test4: false, plaintext: "iaoxlkrxbtoxwbmxieowlcrx"}) }} className="testpass">Decode 1</span> : <span onClick={() => { this.setState({ test1: false, test2: false, test3: true, test4: false, plaintext: "iaoxlkrxbtoxwbmxieowlcrx" }) }} className="test">Decode 1</span>}
                    {JSON.parse(localStorage.getItem("progress")).columnar[3] ? <span onClick={() => { this.setState({ test1: false, test2: false, test3: false, test4: true, plaintext: "anexetexrgmxemaahotwtcoayiky"}) }} className="testpass">Decode 2</span> : <span onClick={() => { this.setState({ test1: false, test2: false, test3: false, test4: true, plaintext: "anexetexrgmxemaahotwtcoayiky" }) }} className="test">Decode 2</span>}
                    {this.state.test1 ? <div>
                        <h3>Encode 1</h3>
                        <p>Encode this message "thelastday" using the columnar cipher with a <span style={{ color: "green" }}>key of "mask"</span></p>
                        <input onChange={this.updateTestInput}></input><button onClick={() => {
                            this.checkEncode("hsyldxtaaetx", 0);
                        }}>Submit your answer</button>
                        <p>{this.props.columnarCheck}</p>
                    </div> : ""}

                    {this.state.test2 ? <div>
                        <h3>Encode 2</h3>
                        <p>Encode this message "dontforgettolockthedoor" using the columnar cipher with a <span style={{ color: "green" }}>key of "steal"</span></p>
                        <input onChange={this.updateTestInput}></input><button onClick={() => {
                            this.checkEncode("teoexnglhrftcdxdotkooroto", 1);
                        }}>Submit your answer</button>
                        <p>{this.props.columnarCheck}</p>
                    </div> : ""}

                    {this.state.test3 ? <div>
                        <h3>Decode 1</h3>
                        <p>Decode this message "iaoxlkrxbtoxwbmxieowlcrx" using the columnar cipher with a <span style={{ color: "green" }}>key of "travel"</span></p>
                        <input onChange={this.updateTestInput}></input><button onClick={() => {
                            this.checkEncode("iwillbebacktomorrowxxxxx", 2);
                        }}>Submit your answer</button>
                        <p>{this.props.columnarCheck}</p>
                    </div> : ""}

                    {this.state.test4 ? <div>
                        <h3>Decode 2</h3>
                        <p>Decode this message "anexetexrgmxemaahotwtcoayiky" using the columnar cipher with a <span style={{ color: "green" }}>key of "trouble"</span></p>
                        <input onChange={this.updateTestInput}></input><button onClick={() => {
                            this.checkEncode("theyarecomingtotakemeawayxxx", 3);
                        }}>Submit your answer</button>
                        <p>{this.props.columnarCheck}</p>
                    </div> : ""}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        columnarExampleText: state.columnarExampleText,
        columnarTestInput: state.columnarTestInput,
        auth: state.auth,
        columnarCheck: state.columnarCheck,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {updateKey: updateKey,
        updateColumnarInput: updateColumnarInput,
        checkColumnarAnswer: checkColumnarAnswer}
        , dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ColumnarTest);
