/*
This file renders the Bank password test
*/
import React, { Component } from "react";
import { PasswordTest } from "../index";

class BankPasswordTest extends Component {
  render() {
    return (
      <PasswordTest
        client="Bank"
        hashedPassword={this.props.hashedPassword}
        storeAttempts={this.props.storeAttempts}
      />
    );
  }
}

export default BankPasswordTest;
