/*
This file renders the Bank password
*/
import React, { Component } from "react";
import { PasswordConfirmation } from "../index";
// import "./App.css";

class BankPasswordConfirmation extends Component {
  render() {
    return (
      <PasswordConfirmation
        client="Bank"
        confirmPassword={this.props.confirmPassword}
      />
    );
  }
}

export default BankPasswordConfirmation;

//site completion method
