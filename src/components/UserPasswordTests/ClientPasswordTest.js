/*
This file renders the Email password test
*/
import React, { Component } from "react";
import { PasswordTest } from "../index";
// import "./App.css";

class ClientPasswordTest extends Component {
  render() {
    return (
      <PasswordTest
        client="Email"
        hashedPassword={this.props.hashedPassword}
        storeAttempts={this.props.storeAttempts}
      />
    );
  }
}

export default ClientPasswordTest;

//site completion method
