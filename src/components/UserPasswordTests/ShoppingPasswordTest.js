/*
This file renders the Shopping password test
*/
import React, { Component } from "react";
import { PasswordTest } from "../index";

class ShoppingPasswordTest extends Component {
  render() {
    return (
      <PasswordTest
        client="Shopping"
        hashedPassword={this.props.hashedPassword}
        storeAttempts={this.props.storeAttempts}
      />
    );
  }
}

export default ShoppingPasswordTest;
