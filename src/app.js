import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import userReducers from '../redux/reducer'
import Routes from './route'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
import theme from './css/theme'

const store = createStore(
	combineReducers({userReducers}),
	applyMiddleware(thunk, logger))

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<Routes />
		</ThemeProvider>
	</Provider>,
	document.getElementById('root'))