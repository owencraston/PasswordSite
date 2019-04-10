/*
This file renders the Shopping password
*/
import React, { Component } from "react";
import { PasswordConfirmation } from "../index";
// import "./App.css";

class ShoppingPasswordConfirmation extends Component {
  render() {
    return (
      <PasswordConfirmation
        client="Shopping"
        confirmPassword={this.props.confirmPassword}
      />
    );
  }
}

export default ShoppingPasswordConfirmation;

//site completion method
