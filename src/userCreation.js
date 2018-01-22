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

class UserCreation extends React.Component{
	constructor(props){
		super(props)
		this.state={
			uname:'',
			email:'',
			gender:'',
			isMarried: true,
			country:'China',
			userInfos:[],
			birthday: new Date(1988, 7, 9)
		}
	}

	handleChange = (field, value) => {
		console.log(field)
		this.setState({...this.state, [field]: value});
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
			this.props.history.push('/show')
		}).catch(function (error) {
		    console.log(error);
	  	});
	}

	render(){
		return (
			<section >
		        <Input type='text' label='Name' value={this.state.uname} onChange={this.handleChange.bind(this, 'uname')} />
		        <Input type='text' label='Email' value={this.state.email} onChange={this.handleChange.bind(this, 'email')} />
		        <RadioGroup label='Gender' name='gender' value={this.state.gender} onChange={this.handleChange.bind(this, 'gender')}>      
			        <RadioButton label='male' value='male' />
			        <RadioButton label='female' value='female'/>
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
				<Button label='Save' primary raised onClick={this.handleSubmit.bind(this)} style={{width:'100%'}}/>
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

// 通过bindActionCreators绑定多个action到User组件
const mapDispatchToProps = (dispatch) => ({
	userActions: bindActionCreators(userActionCreators, dispatch)
})

//绑定单个action到User组件
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		handleSubmit:(id) => {
// 			dispatch(userActionCreators.userInfoAction(id))
// 		}
// 	}
// }

export default connect(mapStateToProps, mapDispatchToProps)(UserCreation)