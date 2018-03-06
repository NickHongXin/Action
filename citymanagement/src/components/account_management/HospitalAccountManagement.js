import React,{ Component } from 'react';
import Manager from '../../css/main.css';
import Pagination from './Pagination';
import HospitalAccountEditorTable from './HospitalAccountEditor';
import * as Api from '../../common/ApiCaller';

const EMPTY_ACCOUNT = {
	hospitalName:'',
	hospitalId:'',
	hospitalCode:'',
	localityCode:'',
	displayName:'',
	mailAddress:'',
	hospitalUserPermissions:[]
};

class HospitalAccountManagement extends Component {
	constructor(props){
		super(props);
		this.state={
			isDialogActive:false,
			hospitalAccounts:[],
			selectedAccount:EMPTY_ACCOUNT,
			searchCondition:'',
			isEdit:false,
			pageSize:25,
			currentPageNo:1,
			hospitalPermissions:[]
		};
	}

	hideOrShowDialog = () => {
	   this.setState({isDialogActive:!this.state.isDialogActive});
	}

	convert = (item) => {
		const hospitalUserPermissions = [];
		this.state.hospitalPermissions.map(permission => {
			let tempPermission = Object.assign({}, permission)
			tempPermission['isChecked']=false;
			if (item && item.hospitalUserPermissions){
				item.hospitalUserPermissions.map(uPermission => {
					if (permission.hospitalPermissionId === uPermission.hospitalPermissionId){
						tempPermission.isChecked = true;
					}
				});
			}
			hospitalUserPermissions.push(tempPermission);
		});
		const hospitalUser = Object.assign({}, item);
		hospitalUser.hospitalUserPermissions = hospitalUserPermissions;
		return hospitalUser;
	}

	handleEdit =(item) =>{
		this.setState({
			selectedAccount:this.convert(item),
			isEdit:true
		});
		this.hideOrShowDialog();
	}
	
	handleCreate = () => {
		this.setState({
			selectedAccount:this.convert(EMPTY_ACCOUNT),
			isEdit:false
		});
		this.hideOrShowDialog();	
	}

	handleChange = (name, event) => {
	    this.setState({[name]: event.target.value});
  	}

  	callHospitalAccountApi = () => {
  		Api.getRequest(
				'/api/hospitalAccount', 
				{
					hospitalName: this.state.searchCondition,
					pageSize: this.state.pageSize,
					pageNo: this.state.currentPageNo
				},
				Api.getToken())
			.then(res => {
				this.setState({
					hospitalAccounts: res.data.data,
					hospitalPermissions: res.data.hospitalPermissions
				});
			})
			.catch(error => {
				if (err.response.status === 401) {
			        sessionStorage.clear();
			        this.props.history.push('/');
		      	}
			})	
  	}

  	handleSearch = () => {
  		this.callHospitalAccountApi();
  	}

	componentDidMount = () => {
		this.callHospitalAccountApi();
	}

  	render(){
	    return (
	    	<div className={Manager.accountSearch}>
				<div className={Manager.searchArea}>
					<span className={Manager.span}>病院アカウント検索</span>
					<input type="text" className={Manager.text} value={this.state.searchCondition} onChange={this.handleChange.bind(this, 'searchCondition')}/>
					<button className={Manager.search} onClick={this.handleSearch}>検索 </button>
					<button className={Manager.new} onClick={this.handleCreate}>新規</button>
				</div>
				< Pagination className={Manager.pageMargin}/>
				<div className={Manager.listArea}>
					<table className={Manager.intable}>
						<thead>
							<tr>
								<th>#</th>
								<th>医療機関名</th>
								<th>医療機関ID</th>
								<th>医療機関コード</th>
								<th>管理者ID</th>
								<th>管轄自治体コード</th>
								<th>編集</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.hospitalAccounts.map((item, idx) => (
									<tr key={idx}>
										<td>{idx + 1}</td>
										<td>{item.hospitalName}</td>
										<td>{item.hospitalId}</td>
										<td>{item.hospitalCode}</td>
										<td>{item.mailAddress}</td>
										<td>{item.localityCode}</td>
										<td><button type="button" className={Manager.edit} onClick={this.handleEdit.bind(this, item)}>編集</button></td>
									</tr>
								))
							}
						</tbody>
					</table>
				</div>
			 	<HospitalAccountEditorTable 
				 	isActive={this.state.isDialogActive} 
				 	hideDialog={this.hideOrShowDialog} 
				 	accountInfo={this.state.selectedAccount} 
				 	isEditMode={this.state.isEdit} />

	    	</div>
	    );
  	}
}

export default HospitalAccountManagement;