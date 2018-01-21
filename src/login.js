import React from 'react'
import {Input} from 'react-toolbox/lib/input'
import {Button} from 'react-toolbox/lib/button'
import {RadioGroup, RadioButton} from 'react-toolbox/lib/radio'
import {Checkbox} from 'react-toolbox/lib/checkbox'
import {Dropdown} from 'react-toolbox/lib/dropdown';
import {DatePicker} from 'react-toolbox/lib/date_picker';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import * as api from './api.js'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userActionCreators from '../redux/action'

const countries = [
  { value: 'England', label: 'England' },
  { value: 'Spain', label: 'Spain'},
  { value: 'Thailand', label: 'Thailand' },
  { value: 'USA', label: 'USA'},
  { value: 'China', label: 'China'}
]

class Login extends React.Component{
	constructor(props){
		super(props)
		this.state={
			uname:'',
			email:'',
			gender:'',
			isMarried: true,
			country:'China',
			userInfos:[]
		}
	}

	handleChange = (field, value) => {
		this.setState({...this.state, [field]: value});
	}

	fetchUserInfo = (id) => {
		api.getUserInfo(id).then(res => {
			this.setState({...this.state, userInfos: res.data})
		}).catch(function (error) {
		    console.log(error);
	  	});
	}

	componentDidMount = () => {
	}

	handleSubmit = () => {
		let newUserInfos = []
		api.postConfirmUser({}, {
			Id: -1,
			Name: this.state.uname,
			Email: this.state.email,
			Gender: this.state.gender,
			IsMarried: this.state.isMarried,
			Country: this.state.country
		}).then(res => {
			newUserInfos.push(res.data)
			this.setState({...this.state, userInfos: newUserInfos})
		}).catch(function (error) {
		    console.log(error);
	  	});
	}

	render(){
		return (
			<section >
		        <Input type='text' label='Name' name='uname' value={this.state.uname} onChange={this.handleChange.bind(this, 'uname')} />
		        <Input type='text' label='Email' name='email' value={this.state.email} onChange={this.handleChange.bind(this, 'email')} />
		        <RadioGroup name='gender' value={this.state.gender} onChange={this.handleChange.bind(this, 'gender')}>
			        <RadioButton label='male' value='male'/>
			        <RadioButton label='female' value='female' />
		      	</RadioGroup>
		      	<Checkbox
		          checked={this.state.isMarried}
		          label="isMarried"
		          onChange={this.handleChange.bind(this, 'isMarried')}
		        />
		        <Dropdown
			        auto
			        onChange={this.handleChange.bind(this, 'country')}
			        source={countries}
			        value={this.state.country}
		      	/>

		      	<DatePicker
		          label='birthday'
		          autoOk
		          inputFormat={(value) => `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}
		          onChange={this.handleChange.bind(this, 'birthday')}
		          value={this.state.birthday}
		          sundayFirstDayOfWeek
		        />

				<Button label='submit' primary raised onClick={this.handleSubmit.bind(this)}/>
				<br />
				<br />
				<br />
				<span>User List: </span>
				<Button label='fetch user1' primary raised onClick={this.fetchUserInfo.bind(this, 1)}/>
				<Button label='fetch user2' primary raised onClick={this.fetchUserInfo.bind(this, 2)}/>
				<Table multiSelectable>
			        <TableHead>
			          <TableCell >Id</TableCell>
			          <TableCell >Name</TableCell>
			          <TableCell >Email</TableCell>
			          <TableCell >Gender</TableCell>
			          <TableCell >IsMarried</TableCell>
			          <TableCell >Country</TableCell>
			        </TableHead>
			        {this.state.userInfos.map((item, idx) => (
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


// const mapStateToProps = (state) => {
// 	return { uname: state.uname }
// }

const mapStateToProps = (state) => ({
	username: state.user.uname
})

// 通过bindActionCreators绑定多个action到Login组件
const mapDispatchToProps = (dispatch) => ({
	userActions: bindActionCreators(userActionCreators, dispatch)
})

//绑定单个action到Login组件
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		handleSubmit:(id) => {
// 			dispatch(userActionCreators.userInfoAction(id))
// 		}
// 	}
// }

export default connect(mapStateToProps, mapDispatchToProps)(Login)