import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router'
import UserCreation from './userCreation'
import UserList from './userList'

const UserRoutes = () => {
	return (
		<div>
			<Route path='/add' component={UserCreation} />
			<Route path='/show' component={UserList} />
		</div>
	)
}

export default UserRoutes