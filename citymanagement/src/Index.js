import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={ Login } />
      <Route path='/index' component={ App } />
    </Switch>
  </Router>,
  document.getElementById('root'));
