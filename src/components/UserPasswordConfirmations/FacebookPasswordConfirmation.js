/*
This file renders the Facebook password
*/
import React, { Component } from "react";
import { PasswordConfirmation } from "../index";
// import "./App.css";

class FacebookPasswordConfirmation extends Component {
  render() {
    return (
      <PasswordConfirmation
        client="Facebook"
        confirmPassword={this.props.confirmPassword}
      />
    );
  }
}

export default FacebookPasswordConfirmation;

//site completion method
