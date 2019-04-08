import React, { Component } from "react";
import {
  PageHeader,
  Form,
  Card,
  Input,
  Button,
  Col,
  Row,
  Icon,
  message
} from "antd";
import { MD5, enc } from "crypto-js";
import "./PasswordTest.css";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class PasswordTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: this.props.client,
      hashedPassword: this.props.hashedPassword,
      currentAttempt: 0,
      attempts: [0, 0, 0],
      attemptDetails: []
    };
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
    this.startTime = new Date();
  }

  compareHashedPassword(fieldHashedPassword) {
    const { hashedPassword } = this.props;
    const stringFieldHashedPassword = fieldHashedPassword.toString(enc.Hex);
    const stringHashedPassword = hashedPassword.toString(enc.Hex);
    if (stringHashedPassword === stringFieldHashedPassword) {
      return true;
    }
    return false;
  }

  handleSubmit = e => {
    e.preventDefault();
    const { client, form } = this.props;
    const currentField = form.getFieldValue("password");
    const hashedCurrentField = MD5(currentField);
    const endTime = new Date();
    const deltaTime = endTime - this.startTime;
    if (!this.compareHashedPassword(hashedCurrentField)) {
      this.props.form.setFields({
        ["password"]: { value: "" }
      });

      message.error("Wrong Password");

      let newAttempts = this.state.attempts;
      newAttempts[this.state.currentAttempt] = -1;

      let newAttemptDetails = this.state.attemptDetails;
      newAttemptDetails.push({
        attempt: "failure",
        time: deltaTime
      });
      this.setState({
        attempts: newAttempts,
        currentAttempt: this.state.currentAttempt + 1,
        attemptDetails: newAttemptDetails
      });

      if (this.state.currentAttempt >= 2) {
        const { storeAttempts } = this.props;
        const { attemptDetails } = this.state;
        setTimeout(function() {
          storeAttempts(attemptDetails);
        }, 1000);
      }

      this.startTime = new Date();
      return;
    }

    form.validateFields((err, values) => {
      if (!err) {
        let newAttempts = this.state.attempts;
        newAttempts[this.state.currentAttempt] = 1;

        let newAttemptDetails = this.state.attemptDetails;
        newAttemptDetails.push({
          attempt: "success",
          time: deltaTime
        });

        this.setState({
          attempts: newAttempts,
          currentAttempt: this.state.currentAttempt + 1,
          attemptDetails: newAttemptDetails
        });
        message.success(client + " Password Correct");
        const { storeAttempts } = this.props;
        const { attemptDetails } = this.state;
        setTimeout(function() {
          storeAttempts(attemptDetails);
        }, 1000);
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    const { client, attempts } = this.state;

    let iconsTracker = [];

    attempts.forEach((attempt, index) => {
      switch (attempt) {
        case -1:
          iconsTracker[index] = (
            <Icon
              type="close-circle"
              theme="twoTone"
              twoToneColor="#f5222d"
              style={{
                fontSize: "32px",
                marginLeft: "10x",
                marginRight: "10px"
              }}
              key={index}
            />
          );
          break;

        case 0:
          iconsTracker[index] = (
            <Icon
              type="minus-circle"
              style={{
                fontSize: "32px",
                marginLeft: "10x",
                marginRight: "10px"
              }}
              key={index}
            />
          );
          break;

        case 1:
          iconsTracker[index] = (
            <Icon
              type="check-circle"
              theme="twoTone"
              twoToneColor="#52c41a"
              style={{
                fontSize: "32px",
                marginLeft: "10x",
                marginRight: "10px"
              }}
              key={index}
            />
          );
          break;
      }
    });

    return (
      <div className="PasswordTest">
        <PageHeader title={"Password Test " + client}>
          <Row className="PasswordForm">
            <Col span={14}>
              <Card title={client + " Password "}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Item
                    validateStatus={passwordError ? "error" : ""}
                    help={passwordError || ""}
                  >
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your password"
                        }
                      ]
                    })(<Input placeholder="Password" spellCheck="false" />)}
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={hasErrors(getFieldsError())}
                    >
                      Check
                    </Button>
                  </Form.Item>
                </Form>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center"
                  }}
                >
                  {iconsTracker}
                </div>
              </Card>
            </Col>
          </Row>
        </PageHeader>
      </div>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: "horizontal_login" })(
  PasswordTest
);

export default WrappedHorizontalLoginForm;
