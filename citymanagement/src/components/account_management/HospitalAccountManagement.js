import React,{ Component } from 'react';
import Main from '../../css/main.css';
import Pagination from './Pagination';
import HospitalAccountEditorTable from './HospitalAccountEditor';
import * as Api from '../../common/ApiCaller';
import * as Constants from '../../common/Constants';
import Logout from '../function/Logout';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as hospitalAction from '../redux/HospitalAccountAction';


class HospitalAccountManagement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDialogActive: false,
			hospitalAccounts: [],
			selectedAccount: Constants.EMPTY_HOSPITAL_ACCOUNT,
			searchCondition: Constants.EMPTY_STRING,
			isEdit: false,
			currentPageNo: 1,
			hospitalPermissions: [],
			totalPage: 0
		};
	}

	hideOrShowDialog = (isActive) => {
	   this.setState({isDialogActive: isActive});
	}

	convert = (item) => {
		const hospitalUserPermissions = [];
		this.props.hospitalAccountListReducers.hospitalPermissions.map(permission => {
			let hosiptalPermission = Object.assign({}, permission);
			hosiptalPermission['isChecked'] = false;
			if (item && item.hospitalUserPermissions){
				item.hospitalUserPermissions.map(uPermission => {
					if (permission.hospitalPermissionId === uPermission.hospitalPermissionId){
						hosiptalPermission.isChecked = true;
					}
				});
			}
			hospitalUserPermissions.push(hosiptalPermission);
		});
		const hospitalUser = Object.assign({}, item);
		hospitalUser.hospitalUserPermissions = hospitalUserPermissions;
		return hospitalUser;
	}

	handleEdit =(item) => {
		this.setState({
			selectedAccount: this.convert(item),
			isEdit: true
		}, () => this.hideOrShowDialog(true));
	}
	
	handleCreate = () => {
		this.setState({
			selectedAccount: this.convert(Constants.EMPTY_HOSPITAL_ACCOUNT),
			isEdit: false
		}, () => this.hideOrShowDialog(true));
	}

	handleChange = (name, event) => {
	    this.setState({[name]: event.target.value});
  	}

 	/*fetchHospitalAccounts = (currentPage) => {
  		Api.getRequest(
			Constants.HOSPITAL_ACCOUNT_API_PATH, 
			{
				hospitalName: this.state.searchCondition,
				pageSize: Constants.PAGE_SIZE,
				pageNo: currentPage
			})
			.then(res => {
				let totalCount = res.data.totalCount;
				let totalPage = Math.floor(totalCount === 0 ? 0 : totalCount / Constants.PAGE_SIZE + (totalCount % Constants.PAGE_SIZE > 0 ? 1 : 0));
				this.setState({
					hospitalAccounts: res.data.data,
					hospitalPermissions: res.data.hospitalPermissions,
					totalPage: totalPage
				});
				Api.setToken(res.headers.authorization);
			})
			.catch(error => {
				if (error.response) {
					if (error.response.status === Constants.HTTP_STATUS_CODE_UNAUTHORIZED) {
			        	Logout.bind(this)();
			    	} else {
			    		if (error.response.headers && error.response.headers.authorization) {
			            	Api.setToken(error.response.headers.authorization);
			          	}
			    	}
		      	}
			});
  	}*/
     
   
  	handleSearch = (currentPage) => {
  		this.props.hospitalActions.getHospitalAcoount(
		{
			hospitalName: this.state.searchCondition,
			pageSize: Constants.PAGE_SIZE,
			pageNo: currentPage

		});
  		this.setState({
  			currentPageNo: currentPage
  		});
  	}

	componentDidMount = () => {
		
		this.props.hospitalActions.getHospitalAcoount(
		{
			hospitalName: this.state.searchCondition,
			pageSize: Constants.PAGE_SIZE,
			pageNo: this.state.currentPageNo

		});
	}
	componentWillReceiveProps =(nextProps) =>
	{
		let totalCount=nextProps.hospitalAccountListReducers.totalCount;
		let totalPage=Math.floor(totalCount === 0 ? 0 : totalCount / Constants.PAGE_SIZE + (totalCount % Constants.PAGE_SIZE > 0 ? 1 : 0));
        this.setState(
        {
        	totalPage:totalPage

        });
	}
	

  	render(){
	    return (
	    	<div className={Main.accountSearch}>
				<div className={Main.searchArea}>
					<span className={Main.span}>病院アカウント検索</span>
					<input type="text" className={Main.text} value={this.state.searchCondition} onChange={this.handleChange.bind(this, 'searchCondition')}/>
					<button className={Main.search} onClick={this.handleSearch.bind(this, 1)}>検索 </button>
					<button className={Main.new} onClick={this.handleCreate}>新規</button>
				</div>
				<Pagination 
					className={Main.pageMargin}
					totalPage={this.state.totalPage}
					currentPage={this.state.currentPageNo}
					handleSearch={this.handleSearch} />
				<div className={Main.listArea}>
					<table className={Main.intable}>
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
								this.props.hospitalAccountListReducers.data.map((item, idx) => (
									<tr key={idx}>
										<td>{idx + 1}</td>
										<td>{item.hospitalName}</td>
										<td>{item.hospitalId}</td>
										<td>{item.hospitalCode}</td>
										<td>{item.mailAddress}</td>
										<td>{item.localityCode}</td>
										<td><button type="button" className={Main.edit} onClick={this.handleEdit.bind(this, item)}>編集</button></td>
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
				 	isEditMode={this.state.isEdit}
				 	handleSearch={this.handleSearch} />
	    	</div>
	    );
  	}
}

const mapStateToProps = (state) => {
    return { hospitalAccountListReducers: state.hospitalReducers.hospitalAccountList }//自动对应到index中的hospitalReducers
}

const mapDispatchToProps = (dispatch) => ({
    hospitalActions: bindActionCreators(hospitalAction, dispatch)
})

export  default connect(mapStateToProps, mapDispatchToProps)(HospitalAccountManagement);