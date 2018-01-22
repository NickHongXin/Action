import React from 'react'
import UserNav from './userNav'
import UserRoute from './userRoute'

class User extends React.Component{
	constructor(props){
		super(props)
	}

	componentDidMount = () => {
		this.props.history.push('/add')
	}

	render(){
		return (
			<section >
				<div style={{width:'50%', paddingLeft:'25%', paddingTop:'10%'}}>
					<UserNav />
			        <UserRoute />
				</div>
			</section>
		)
	}
}

export default User