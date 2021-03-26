import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { HashRouter as Router, Route , Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";
import Register from "./views/Register/Register";

const hist = createBrowserHistory();
localStorage.setItem('FirmId','1');
ReactDOM.render(
  
    <Router history={hist}>
      <Switch>
        <Route path="/admin"  component={Admin} />
        <Route path="/register"  component={Register} />
        
        <Redirect from="/"  to="/admin/numarataj/" />
      </Switch>
    </Router>
  ,
  document.getElementById("root")
);
