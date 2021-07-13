import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CaesarOptions from "./components/caesar/option"
import CaesarTest from "./components/caesar/caesarTest"
import playfairOptions from "./components/playfair/options"
import playfairTest from "./components/playfair/playfairTest"
import columnarOptions from "./components/columnar/options"
import columnarTest from "./components/columnar/columnarTest"
import railfenceOptions from "./components/railfence/options"
import railfenceTest from "./components/railfence/railfenceTest"
import vigenereOptions from "./components/vigenere/options"
import vigenereTest from "./components/vigenere/vigenereTest"
import foursquareOptions from "./components/foursquare/options"
import foursquareTest from "./components/foursquare/foursquareTest"

import PrivateRoute from "./components/private-route/PrivateRoute";


import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar /> 
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Switch>
            <PrivateRoute exact path="/" component={Landing} />
            {/* caesar routes */}
            <PrivateRoute exact path="/caesar" component={CaesarOptions} />
            <PrivateRoute exact path="/caesar/test" component={CaesarTest}/>
            {/* playfair PrivateRoutes */}
            <PrivateRoute exact path="/playfair" component={playfairOptions}/>
            <PrivateRoute exact path="/playfair/test" component={playfairTest}/>
            {/* columnar PrivateRoutes */}
            <PrivateRoute exact path="/columnar" component={columnarOptions}/>
            <PrivateRoute exact path="/columnar/test" component={columnarTest}/>
            {/* railfence PrivateRoutes */}
            <PrivateRoute exact path="/railfence" component={railfenceOptions}/>
            <PrivateRoute exact path="/railfence/test" component={railfenceTest}/>
            {/* vigenere PrivateRoutes */}
            <PrivateRoute exact path="/vigenere" component={vigenereOptions}/>
            <PrivateRoute exact path="/vigenere/test" component={vigenereTest}/>
            {/* four square PrivateRoutes */}
            <PrivateRoute exact path="/foursquare" component={foursquareOptions}/>
            <PrivateRoute exact path="/foursquare/test" component={foursquareTest}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
