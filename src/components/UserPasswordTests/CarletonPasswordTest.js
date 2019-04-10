/*
This file renders the Carleton password test
*/
import React, { Component } from "react";
import { PasswordTest } from "../index";

class CarletonPasswordTest extends Component {
  render() {
    return (
      <PasswordTest
        client="Carleton"
        hashedPassword={this.props.hashedPassword}
        storeAttempts={this.props.storeAttempts}
      />
    );
  }
}

export default CarletonPasswordTest;
