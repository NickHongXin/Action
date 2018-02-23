import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-toolbox/lib/button';
import { AppBar } from 'react-toolbox/lib/app_bar';
import btncss from './css/button.css';
import appBarTheme from './css/appBar.css';
import App from './App';
import Login from './Login'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={ Login } />
      <Route path='/index' component={ App } />
    </Switch>
  </Router>
  ,
  document.getElementById('root'));
