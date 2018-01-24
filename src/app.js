import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import userReducers from '../redux/reducer'
import Routes from './route'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const store = createStore(
	combineReducers({userReducers}),
	applyMiddleware(thunk, logger))

ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('root'))