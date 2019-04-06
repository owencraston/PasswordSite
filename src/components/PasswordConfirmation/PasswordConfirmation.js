import React, { Component } from "react";
import "./PasswordConfirmation.css";
import { Card, Input, Icon } from "antd";

class PasswordConfirmation extends Component {
  render() {
    return (
      <div className="PasswordConfirmation">
        <Card>
          <Input placeholder="Password" />
        </Card>
        <Card>
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
        </Card>
      </div>
    );
  }
}

export default PasswordConfirmation;
