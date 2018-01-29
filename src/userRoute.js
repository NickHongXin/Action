import React from 'react'
import {Route, Switch} from 'react-router'
import UserCreation from './userCreation'
import UserList from './userList'

const UserRoutes = () => {
	return (
		<Switch>
			<Route path='/add' render={
				(props) => {
					console.log(`match: ${JSON.stringify(props.match)}`)
					console.log(`location: ${JSON.stringify(props.location)}`)
					console.log(`history: ${JSON.stringify(props.history)}`)
					return <UserCreation {...props}/>}
			}/>
			<Route path='/show' children = {
				({match}) => {
					return match ? <UserList /> : <h1>Not Found!</h1>
				}
			} />
		</Switch>
	)
}

export default UserRoutes