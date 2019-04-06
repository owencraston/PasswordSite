import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import { App } from "./components";
import * as serviceWorker from "./serviceWorker";

import { HashRouter, Route, Link, Switch } from 'react-router-dom'

export default () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" components={App}/>
        </Switch>
    </ HashRouter>
)

ReactDOM.render(<App />, document.getElementById("root"));

// serviceWorker.unregister();
