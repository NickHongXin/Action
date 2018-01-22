import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router'
import User from './user'

const Routes = () => {
	return (
		<BrowserRouter>
			<Route path='/' component={User} />
		</BrowserRouter>
	)
}

export default Routes