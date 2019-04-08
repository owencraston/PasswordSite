import React, { Component } from "react";
import "./App.css";
import { PageHeader } from "antd";
import {
  ClientPasswordConfirmation,
  CarletonPasswordConfirmation,
  FacebookPasswordConfirmation,
  ClientPasswordTest
} from "../index";
import {
  CarletonPasswordTest,
  FacebookPasswordTest
} from "../UserPasswordTests";
class App extends Component {
  constructor(props) {
    super(props);
    this.attemptDetails = [];
    this.state = {
      currentScreen: 0,
      emailHashedPassword: "",
      carletonHashedPassword: "",
      facebookHashedPassword: ""
    };
  }

  nextScreen() {
    const { currentScreen } = this.state;
    this.setState({
      currentScreen: currentScreen + 1
    });
  }

  saveHashedPassword(hashedPassword) {
    const { currentScreen } = this.state;
    console.log(hashedPassword);
    switch (currentScreen) {
      case 0:
        this.setState({
          emailHashedPassword: hashedPassword,
          currentScreen: currentScreen + 1
        });
        break;
      case 1:
        this.setState({
          carletonHashedPassword: hashedPassword,
          currentScreen: currentScreen + 1
        });
        break;
      case 2:
        this.setState({
          facebookHashedPassword: hashedPassword,
          currentScreen: currentScreen + 1
        });
        break;
      default:
        break;
    }
  }

  saveAttempts(attemptDetails) {
    this.attemptDetails.push(attemptDetails);
    this.setState({
      currentScreen: this.state.currentScreen + 1
    });
  }

  render() {
    const emailClient = (
      <ClientPasswordConfirmation
        confirmPassword={this.saveHashedPassword.bind(this)}
      />
    );

    const carletonClient = (
      <CarletonPasswordConfirmation
        confirmPassword={this.saveHashedPassword.bind(this)}
      />
    );

    const facebookClient = (
      <FacebookPasswordConfirmation
        confirmPassword={this.saveHashedPassword.bind(this)}
      />
    );

    const emailTestClient = (
      <ClientPasswordTest
        hashedPassword={this.state.emailHashedPassword}
        storeAttempts={this.saveAttempts.bind(this)}
      />
    );

    const carletonTestClient = (
      <CarletonPasswordTest
        hashedPassword={this.state.carletonHashedPassword}
        storeAttempts={this.saveAttempts.bind(this)}
      />
    );

    const facebookTestClient = (
      <FacebookPasswordTest
        hashedPassword={this.state.facebookHashedPassword}
        storeAttempts={this.saveAttempts.bind(this)}
      />
    );

    const finalScreen = <PageHeader title="Thanks!" />;

    const allScreens = [
      emailClient,
      carletonClient,
      facebookClient,
      emailTestClient,
      carletonTestClient,
      facebookTestClient,
      finalScreen
    ];

    const { currentScreen } = this.state;
    return <div className="App">{allScreens[currentScreen]}</div>;
  }
}

export default App;

//site completion method
