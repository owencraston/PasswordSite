import React, { Component } from "react";
import { PasswordConfirmation } from "../index";
// import "./App.css";

class CarletonPasswordConfirmation extends Component {
  render() {
    return (
      <PasswordConfirmation
        client="Carleton"
        confirmPassword={this.props.confirmPassword}
      />
    );
  }
}

export default CarletonPasswordConfirmation;

//site completion method
