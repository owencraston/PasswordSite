import React, { Component } from "react";
import "./PasswordConfirmation.css";
import { PageHeader, Form, Card, Input, Button, Col, Row, message } from "antd";
import axios from "axios";
import { MD5 } from "crypto-js";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const wordsApiEndpoint = "https://wordsapiv1.p.rapidapi.com";

class PasswordConfirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client: this.props.client,
      password: "test",
      hashed_password: MD5("test")
    };
    // this.generatePassword();
  }

  generatePassword() {
    const wordsApiHeaders = {
      "X-RapidAPI-Key": "550cee20f6msh253d7e0120b4dedp12fda9jsnf7740ee04a0c",
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com"
    };
    let wordsApiDefaultParams = {
      random: "true",
      partOfSpeech: "adjective",
      frequencyMin: "5",
      syllablesMin: "2",
      syllablesMax: "4",
      lettersMax: "8",
      lettersMin: "4"
    };
    let password = "";
    if (this.state.password !== "") {
      return;
    }
    axios
      .get(wordsApiEndpoint + "/words/", {
        headers: wordsApiHeaders,
        params: wordsApiDefaultParams
      })
      .then(value => {
        password += value.data.word + "-";

        wordsApiDefaultParams.partOfSpeech = "verb";
        return axios.get(wordsApiEndpoint + "/words/", {
          headers: wordsApiHeaders,
          params: wordsApiDefaultParams
        });
      })
      .then(value => {
        password += value.data.word + "-";

        wordsApiDefaultParams.partOfSpeech = "verb";
        return axios.get(wordsApiEndpoint + "/words/", {
          headers: wordsApiHeaders,
          params: wordsApiDefaultParams
        });
      })
      .then(value => {
        password += value.data.word + "-";

        wordsApiDefaultParams.partOfSpeech = "adjective";
        return axios.get(wordsApiEndpoint + "/words/", {
          headers: wordsApiHeaders,
          params: wordsApiDefaultParams
        });
      })
      .then(value => {
        password += value.data.word + "-";

        wordsApiDefaultParams.partOfSpeech = "noun";
        return axios.get(wordsApiEndpoint + "/words/", {
          headers: wordsApiHeaders,
          params: wordsApiDefaultParams
        });
      })
      .then(value => {
        password += value.data.word;
        this.setState({
          password: password,
          hashed_password: MD5(password).words
        });
      });

    this.setState({
      password: password,
      hashed_password: MD5(password).words
    });
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(this.props.client + " Password Saved");
        this.props.confirmPassword(MD5(values.password));
      }
    });
  };

  correctPassword(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value !== this.state.password) {
          callback([new Error("Password Doesnt Match")]);
        } else {
          callback();
        }
      }, 1000);
    }
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const passwordError =
      isFieldTouched("password") && getFieldError("password");

    const { client } = this.state;
    return (
      <div className="PasswordConfirmation">
        <PageHeader title={"Password Creation " + client}>
          <Row className="PasswordForm">
            <Col span={14}>
              <Card title={client + " Password: " + this.state.password}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Item
                    validateStatus={passwordError ? "error" : ""}
                    help={passwordError || ""}
                  >
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          message: "Password doesn't match",
                          validator: this.correctPassword.bind(this)
                        },
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
                      Confirm
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </PageHeader>
      </div>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: "horizontal_login" })(
  PasswordConfirmation
);

export default WrappedHorizontalLoginForm;
// export default PasswordConfirmation;

/*
       <div className="">
                <Icon
                type="check-circle"
                theme="twoTone"
                twoToneColor="#52c41a"
                style={{ fontSize: "32px" }}
                />
                <Icon
                type="close-circle"
                theme="twoTone"
                twoToneColor="#f5222d"
                style={{ fontSize: "32px" }}
                />
                <Icon type="minus-circle" style={{ fontSize: "32px" }} />
            </div>
                */
