import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import userReducers from '../redux/reducer'
import Routes from './route'

const store = createStore(combineReducers({userReducers}))

ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('root'))