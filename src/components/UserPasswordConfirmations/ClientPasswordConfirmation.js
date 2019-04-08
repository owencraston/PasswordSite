import React, { Component } from "react";
import { PasswordConfirmation } from "../index";
// import "./App.css";

class ClientPasswordConfirmation extends Component {
  render() {
    return (
      <PasswordConfirmation
        client="Email"
        confirmPassword={this.props.confirmPassword}
      />
    );
  }
}

export default ClientPasswordConfirmation;

//site completion method
