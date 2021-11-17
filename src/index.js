import React from "react";
import ReactDOM from "react-dom";
import {createStore,combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route , Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";
import Register from "./views/Register/Register";

import birimlerReducer from './store/reducers/birimler';
import amaclarReducer from './store/reducers/amaclar';
import hedeflerReducer from './store/reducers/hedefler';
import performanslarReducer from './store/reducers/performanslar';
import strategyReducer from './store/reducers/birimstratejibilgiler';
import olcubirimiReducer from './store/reducers/olcubirimi';
import birimtipiReducer from './store/reducers/birimtipleri';
import yazilimlarReducer from './store/reducers/birimislemleri/yazilimlar';
import donanimlarReducer from './store/reducers/birimislemleri/donanimlar';
import araclarReducer from './store/reducers/birimislemleri/araclistesi';
import personellerReducer from './store/reducers/birimislemleri/personeller';
import fizikselyapilarReducer from './store/reducers/birimislemleri/fizikselyapilar';
import yetkigorevlerReducer from './store/reducers/birimislemleri/yetkigorev';
import mevzuatlarReducer from './store/reducers/birimislemleri/mevzuatlar';
import stratejikYillarReducer from './store/reducers/stratejikyil';
import performansGostergesiReducer from './store/reducers/performansgostergesi';
import faaliyetTurleriReducer from './store/reducers/faaliyetturleri';


const hist = createBrowserHistory();
localStorage.setItem('FirmId','1');
const rootReducer =combineReducers({
  birimler:birimlerReducer,
  amaclar:amaclarReducer,
  hedefler:hedeflerReducer,
  performanslar:performanslarReducer,
  strategydata: strategyReducer,
  olcubirimi:olcubirimiReducer,
  birimtipleri:birimtipiReducer,
  yazilimlar:yazilimlarReducer,
  donanimlar:donanimlarReducer,
  araclar:araclarReducer,
  personeller:personellerReducer,
  fizikselyapilar:fizikselyapilarReducer,
  yetkigorevler:yetkigorevlerReducer,
  mevzuatlar:mevzuatlarReducer,
  stratejikyillar:stratejikYillarReducer,
  performansgostergeleri:performansGostergesiReducer,
  faaliyetturleri:faaliyetTurleriReducer
});
const initialState = {

}
const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
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
