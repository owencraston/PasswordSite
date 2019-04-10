/*
This file contains a majority of the logic for this site.

class App:
  is the class where most of the logic lives and will be imported/exported

saveDataToFirebase:
  this method is where we calculate and store all metrics related to password entry
  
  the metrics we are tracking are as follows:
  totalLogins
  succesfulLogins
  failedLogins
  totalLoginTime
  succesfulLoginTime
  failedLoginTime

  we calculate these values dynamically and then store them in firebase with the user_id

nextScreen:
  simply checks what screen the user is on and then increments it to the next screen and store it in the program state

saveHashedPassword:
  takes the hashed password and saves it in the state.

saveAttempts:
  simialr to saveDataToFirebase this function saves the metrics to state

render:
  renders the ui logic to the site

*/
import React, { Component } from "react";
import "./App.css";
import { PageHeader } from "antd";
import {
  ClientPasswordConfirmation,
  BankPasswordConfirmation,
  ShoppingPasswordConfirmation,
  ClientPasswordTest
} from "../index";
import { BankPasswordTest, ShoppingPasswordTest } from "../UserPasswordTests";

import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyDuK3yBJJRWrrRJ_sTkMqDYZoTfbxGE6DI",
  authDomain: "password-generator-e4e47.firebaseapp.com",
  databaseURL: "https://password-generator-e4e47.firebaseio.com",
  projectId: "password-generator-e4e47",
  storageBucket: "password-generator-e4e47.appspot.com",
  messagingSenderId: "723298110874"
};

firebase.initializeApp(config);

// eslint-disable-next-line
const db = firebase.database();

class App extends Component {
  constructor(props) {
    super(props);
    this.attemptDetails = [];
    this.dataSaved = false;
    this.userId = Math.floor(Math.random() * 90000) + 10000;
    this.state = {
      currentScreen: 0,
      emailHashedPassword: "",
      bankHashedPassword: "",
      shoppingHashedPassword: ""
    };
  }

  componentDidUpdate() {
    if (this.state.currentScreen >= 6 && !this.dataSaved) {
      this.saveDataToFirebase();
    }
  }

  saveDataToFirebase() {
    this.dataSaved = true;
    console.log(this.attemptDetails);

    let totalLogins = 0;
    let succesfulLogins = 0;
    let failedLogins = 0;

    let totalLoginTime = 0;
    let succesfulLoginTime = 0;
    let failedLoginTime = 0;

    this.attemptDetails.forEach(attempt => {
      let successfulAttempt = true;
      if (attempt.attempt === "success") {
        succesfulLogins += 1;
        succesfulLoginTime += attempt.time;
      } else {
        failedLogins += 1;
        failedLoginTime += attempt.time;
        successfulAttempt = false;
      }
      totalLogins += 1;
      totalLoginTime += attempt.time;
      db.ref("attempts/" + this.userId).set({
        user_id: this.userId,
        time: attempt.time,
        success: successfulAttempt
      });
    });

    let averageLoginTime = totalLoginTime / totalLogins;
    let averageSuccesfulLoginTime = 0;
    if (succesfulLogins) {
      averageSuccesfulLoginTime = succesfulLoginTime / succesfulLogins;
    }
    let averageFailedLoginTime = 0;
    if (failedLogins) {
      averageFailedLoginTime = failedLoginTime / failedLogins;
    }

    db.ref("summaries/" + this.userId).set({
      user_id: this.userId,
      total_logins: totalLogins,
      successful_logins: succesfulLogins,
      failed_logins: failedLogins,
      average_success_time: averageSuccesfulLoginTime,
      average_login_time: averageLoginTime,
      average_failed_time: averageFailedLoginTime
    });
  }

  nextScreen() {
    const { currentScreen } = this.state;
    this.setState({
      currentScreen: currentScreen + 1
    });
  }

  saveHashedPassword(hashedPassword) {
    const { currentScreen } = this.state;
    switch (currentScreen) {
      case 0:
        this.setState({
          emailHashedPassword: hashedPassword,
          currentScreen: currentScreen + 1
        });
        break;
      case 1:
        this.setState({
          bankHashedPassword: hashedPassword,
          currentScreen: currentScreen + 1
        });
        break;
      case 2:
        this.setState({
          shoppingHashedPassword: hashedPassword,
          currentScreen: currentScreen + 1
        });
        break;
      default:
        break;
    }
  }

  saveAttempts(attemptDetails) {
    attemptDetails.forEach(attemptDetail => {
      this.attemptDetails.push(attemptDetail);
    });

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

    const bankClient = (
      <BankPasswordConfirmation
        confirmPassword={this.saveHashedPassword.bind(this)}
      />
    );

    const shoppingClient = (
      <ShoppingPasswordConfirmation
        confirmPassword={this.saveHashedPassword.bind(this)}
      />
    );

    const emailTestClient = (
      <ClientPasswordTest
        hashedPassword={this.state.emailHashedPassword}
        storeAttempts={this.saveAttempts.bind(this)}
      />
    );

    const bankTestClient = (
      <BankPasswordTest
        hashedPassword={this.state.bankHashedPassword}
        storeAttempts={this.saveAttempts.bind(this)}
      />
    );

    const shoppingTestClient = (
      <ShoppingPasswordTest
        hashedPassword={this.state.shoppingHashedPassword}
        storeAttempts={this.saveAttempts.bind(this)}
      />
    );

    const finalScreen = <PageHeader title="Thanks!" />;

    const allScreens = [
      emailClient,
      bankClient,
      shoppingClient,
      emailTestClient,
      bankTestClient,
      shoppingTestClient,
      finalScreen
    ];

    const { currentScreen } = this.state;
    return (
      <div className="App">
        <PageHeader title={"User ID: " + this.userId}>
          {allScreens[currentScreen]}
        </PageHeader>
      </div>
    );
  }
}

export default App;

//site completion method
