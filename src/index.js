import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createBrowserHistory } from "history";
import * as serviceWorker from './serviceWorker';
import {  Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";

const hist = createBrowserHistory();

ReactDOM.render(<Router history={hist}> 
               <Switch>
               <Route path="/login" component={Login}/>
               <Route path="/" component={Dashboard}/>
               </Switch>
                </Router>,
     document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
