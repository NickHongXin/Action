import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import Reducers from './components/redux/HospitalAccountReducer'
import LocalityReducers from './components/redux/LocalityAccountReducer'
const store = createStore(
	combineReducers({hospitalReducers:Reducers,
		localityReducers:LocalityReducers}),
	applyMiddleware(thunk, logger))
ReactDOM.render(
			<Provider store={store}>
				<Router>
				<Switch>
				<Route exact path='/' component={ Login } />
				<Route path='/index' component={ App } />
				</Switch>
			    </Router>
			</Provider>,
  document.getElementById('root'));
