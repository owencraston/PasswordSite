/*
This file renders the Facebook password test
*/
import React, { Component } from "react";
import { PasswordTest } from "../index";

class FacebookPasswordTest extends Component {
  render() {
    return (
      <PasswordTest
        client="Facebook"
        hashedPassword={this.props.hashedPassword}
        storeAttempts={this.props.storeAttempts}
      />
    );
  }
}

export default FacebookPasswordTest;
