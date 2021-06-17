import React from "react";
import ReactDOM from "react-dom";
import {createStore,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import { createBrowserHistory } from "history";
import { HashRouter as Router, Route , Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";
import Register from "./views/Register/Register";

import birimlerReducer from './store/reducers/birimler';
import amaclarReducer from './store/reducers/amaclar';
import hedeflerReducer from './store/reducers/hedefler';
import performanslarReducer from './store/reducers/performanslar';

const hist = createBrowserHistory();
localStorage.setItem('FirmId','1');
const rootReducer =combineReducers({
  birimler:birimlerReducer,
  amaclar:amaclarReducer,
  hedefler:hedeflerReducer,
  performanslar:performanslarReducer
});
const store = createStore(rootReducer)
ReactDOM.render(
  <Provider store= {store}>
      <Router history={hist}>
        <Switch>
          <Route path="/admin"  component={Admin} />
          <Route path="/register"  component={Register} />
          
          <Redirect from="/"  to="/admin/numarataj/" />
        </Switch>
      </Router>
    </Provider>
  ,
  document.getElementById("root")
);
