import React from 'react'
import {Link} from 'react-router-dom'

const UserNav = () => (
	<div>
		<Link to='/add'>Add User</Link>
		<Link to='/show' style={{marginLeft:'20px'}}>List User</Link>
	</div>
)

export default UserNav