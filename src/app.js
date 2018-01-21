import React from 'react'
import ReactDOM from 'react-dom'
import Login from './login'
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import userReducers from '../redux/reducer'

const store = createStore(combineReducers({user:userReducers}))

ReactDOM.render(
	<Provider store={store}>
		<Login />
	</Provider>,
	document.getElementById('root'))