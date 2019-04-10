/*
This file pulls from the components folder and sets up the route for the landing 
page of the site: http://www.owencraston.com/PasswordSite/. 
In this case we wrap all the logic into the App component so we can simply pull this in as our only route
*/
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import { App } from "./components";

import { HashRouter, Route, Switch } from "react-router-dom";

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" components={App} />
    </Switch>
  </HashRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));

// serviceWorker.unregister();
