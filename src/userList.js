import React from 'react'
import {Button} from 'react-toolbox/lib/button'
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import * as api from './api.js'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchUserInfo} from '../redux/action'

class UserList extends React.Component{
	constructor(props){
		super(props)
		this.state={
			userInfos:[]
		}
	}

	componentDidMount = () => {
		this.props.fetchUserInfo();
	}

	fetchUserInfo = (id) => {
		let cachedUser = sessionStorage.getItem(id);
		if (cachedUser) {
			console.log('from cache')
			this.setState({...this.state, userInfos: JSON.parse(cachedUser)})
			return;
		}
		api.getUserInfo(id).then(res => {
			console.log('from server')
			this.onSetUser(id, res.data)
		}).catch(function (error) {
		    console.log(error);
	  	});
	}

	onSetUser = (id, user) => {
		sessionStorage.setItem(id, JSON.stringify(user));
		this.setState({...this.state, userInfos: JSON.parse(sessionStorage.getItem(id))});
	}

	render(){
		return (
			<section >
				<Button label='fetch user1' primary raised onClick={this.fetchUserInfo.bind(this, 1)} style={{marginLeft:'10px'}} />
				<Button label='fetch user2' primary raised onClick={this.fetchUserInfo.bind(this, 2)} style={{marginLeft:'10px'}} />
				<Table multiSelectable>
			        <TableHead>
			          <TableCell >Id</TableCell>
			          <TableCell >Name</TableCell>
			          <TableCell >Email</TableCell>
			          <TableCell >Gender</TableCell>
			          <TableCell >IsMarried</TableCell>
			          <TableCell >Country</TableCell>
			        </TableHead>
			        {this.props.userInfoArray.map((item, idx) => (
			          <TableRow key={idx}>
			            <TableCell >{item.Id}</TableCell>
			            <TableCell >{item.Name}</TableCell>
			            <TableCell >{item.Email}</TableCell>
			            <TableCell >{item.Gender}</TableCell>
			            <TableCell >{item.IsMarried.toString()}</TableCell>
			            <TableCell >{item.Country}</TableCell>
			          </TableRow>
			        ))}
		      	</Table>
			</section>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userInfoArray: state.userReducers.userInfoArray
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserInfo: () => dispatch(fetchUserInfo())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)