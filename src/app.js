import React, {Component} from 'react'
import ReactDom from 'react-dom'
import {Button} from 'antd'
import Login from './page/login/index.js'
import Routes from './routes.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import Reducer from './redux/reducer/reducer.js'
import thunk from 'redux-thunk'

let store = createStore(Reducer, applyMiddleware(thunk))

ReactDom.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById("app")
)
