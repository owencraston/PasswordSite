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
      carletonHashedPassword: "",
      facebookHashedPassword: ""
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
      if (attempt.attempt === "success") {
        succesfulLogins += 1;
        succesfulLoginTime += attempt.time;
      } else {
        failedLogins += 1;
        failedLoginTime += attempt.time;
      }
      totalLogins += 1;
      totalLoginTime += attempt.time;
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

    console.log(
      "Total Logins: " +
        totalLogins +
        ", Total Login Time: " +
        totalLoginTime +
        ", Average Login Time: " +
        averageLoginTime
    );

    console.log(
      "Succesful Logins: " +
        succesfulLogins +
        ", Succesful Login Time: " +
        succesfulLoginTime +
        ", Average Succesful Login Time: " +
        averageSuccesfulLoginTime
    );

    console.log(
      "Failed Logins: " +
        failedLogins +
        ", Failed Login Time: " +
        failedLoginTime +
        ", Average Failed Login Time: " +
        averageFailedLoginTime
    );

    // db.ref('attempts/' + userId).set({
    //   user_id: userId,
    //   total_logins: totalLogins,
    //   successful_logins : successfulLogins,
    //   failed_logins: failedLogins,
    //   average_success_time: averageSuccessTime,
    //   average_login_time: averageLoginTime
    // });
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
