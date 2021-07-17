import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateVigenereInput, checkVigenereAnswer} from "../../actions/vigenereActions";
import { setCurrentUser } from "../../actions/authActions";
import "../../componentCSS/caesarOptions.css"
import { Link, Redirect } from "react-router-dom";

class VigenereTest extends Component {
    constructor() {
        super();
        this.checkEncode = this.checkEncode.bind(this);
        this.updateTestInput = this.updateTestInput.bind(this);
        this.state = {
            test1: false,
            test2: false,
            test3: false,
            test4: false
        }
    }

    updateTestInput = e => {
        this.props.updateVigenereInput(e.target.value.toLowerCase());
    }

    checkEncode(answer, id) {
        this.props.checkVigenereAnswer(answer, this.props.vigenereTestInput, this.props.auth.user.id, id);
    }

    render() {

        return (
            <div>
                <div className="column">
                    <h1>Caesar Testing</h1> <br /><br />
                    <Link to="/vigenere">Go back</Link><br /><br />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Vigen%C3%A8re_square_shading.svg/1200px-Vigen%C3%A8re_square_shading.svg.png" style={{ height: "30vw" }}></img>
                </div>
                <div className="column">
                    <h3>Tests</h3>
                    {JSON.parse(localStorage.getItem("progress")).vigenere[0] ? <span onClick={() => { this.setState({ test1: true, test2: false, test3: false, test4: false }) }} className="testpass">Encode 1</span> : <span onClick={() => { this.setState({ test1: true, test2: false, test3: false, test4: false }) }} className="test">Encode 1</span>}
                    {JSON.parse(localStorage.getItem("progress")).vigenere[1] ? <span onClick={() => { this.setState({ test1: false, test2: true, test3: false, test4: false }) }} className="testpass">Encode 2</span> : <span onClick={() => { this.setState({ test1: false, test2: true, test3: false, test4: false }) }} className="test">Encode 2</span>}
                    {JSON.parse(localStorage.getItem("progress")).vigenere[2] ? <span onClick={() => { this.setState({ test1: false, test2: false, test3: true, test4: false }) }} className="testpass">Decode 1</span> : <span onClick={() => { this.setState({ test1: false, test2: false, test3: true, test4: false }) }} className="test">Decode 1</span>}
                    {JSON.parse(localStorage.getItem("progress")).vigenere[3] ? <span onClick={() => { this.setState({ test1: false, test2: false, test3: false, test4: true }) }} className="testpass">Decode 2</span> : <span onClick={() => { this.setState({ test1: false, test2: false, test3: false, test4: true }) }} className="test">Decode 2</span>}
                    {this.state.test1 ? <div>
                        <h3>Encode 1</h3>
                        <p>Encode this message "happybirthday" using the vigenere cipher with a <span style={{ color: "green" }}>key of "alaska"</span></p>
                        <input onChange={this.updateTestInput}></input><button onClick={() => {
                            this.checkEncode("hlphibictznay", 0);
                        }}>Submit your answer</button>
                        <p>{this.props.vigenereCheck}</p>
                    </div> : ""}

                    {this.state.test2 ? <div>
                        <h3>Encode 2</h3>
                        <p>Encode this message "goodmorning" using the vigenere cipher with a <span style={{ color: "green" }}>key of "gecko"</span></p>
                        <input onChange={this.updateTestInput}></input><button onClick={() => {
                            this.checkEncode("msqnauvpsbm", 1);
                        }}>Submit your answer</button>
                        <p>{this.props.vigenereCheck}</p>
                    </div> : ""}

                    {this.state.test3 ? <div>
                        <h3>Decode 1</h3>
                        <p>Decode this message "zkxfnhxwoynwev" using the vigenere cipher with a <span style={{ color: "green" }}>key of "sweater"</span></p>
                        <input onChange={this.updateTestInput}></input><button onClick={() => {
                            this.checkEncode("hotfudgesundae", 2);
                        }}>Submit your answer</button>
                        <p>{this.props.vigenereCheck}</p>
                    </div> : ""}

                    {this.state.test4 ? <div>
                        <h3>Decode 2</h3>
                        <p>Decode this message "dtcgmljc" using the vigenere cipher with a <span style={{ color: "green" }}>key of "violin"</span></p>
                        <input onChange={this.updateTestInput}></input><button onClick={() => {
                            this.checkEncode("iloveyou", 3);
                        }}>Submit your answer</button>
                        <p>{this.props.vigenereCheck}</p>
                    </div> : ""}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        vigenereTestInput: state.vigenereTestInput,
        auth: state.auth,
        vigenereCheck: state.vigenereCheck,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {updateVigenereInput: updateVigenereInput,
        checkVigenereAnswer: checkVigenereAnswer}
        , dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(VigenereTest);
