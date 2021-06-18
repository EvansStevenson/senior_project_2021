import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../componentCSS/navbar.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
   
      const { user } = this.props.auth;
      if(user.name !== undefined){
        return (
          <div>
            <div className="topnav">
            <button className="navitem" style={{color: "#FF0000"}} onClick={this.onLogoutClick}>Log Out</button>
            <p style={{color: "#FFFFFF"}}>{user.name}</p>
            </div>
          </div>
        )
      }else{
          return(
          <div>
              <div className="topnav">
              <Link to="/register" className="navitem">Signup</Link>
              <Link to="/login" className="navitem">Log In</Link>
              </div>
          </div>
          )
        }
      };
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);

