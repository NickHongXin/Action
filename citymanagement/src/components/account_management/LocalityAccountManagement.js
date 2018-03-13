import React,{ Component } from 'react';
import Main from '../../css/main.css';
import Pagination from './Pagination';
import LocalityAccountEditor from './LocalityAccountEditor';
import * as Constants from '../../common/Constants';
import * as Api from '../../common/ApiCaller';
import Logout from '../function/Logout';

class LocalityAccountManagement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDialogActive: false,
			localityAccounts: [],
			selectedAccount: Constants.EMPTY_LOCALITY_ACCOUNT,
			searchCondition: Constants.EMPTY_STRING,
			isEdit: false,
			currentPageNo: 1,
			localityPermissions:[],
			totalPage: 0
		};
	}

	changeSearchCode = () => {
		this.setState({searchCondition: this.refs.SearchCode.value});
	}

    hideOrShowDialog = (isActive) => {
	    this.setState({isDialogActive: isActive});
  	}

  	convert = (item) => {

		const localityUserPermissions = [];
		this.state.localityPermissions.map(permission => {
			let localityPermission = Object.assign({}, permission)
			localityPermission['isChecked'] = false;
			if (item && item.localityUserPermissions){
				item.localityUserPermissions.map(uPermission => {
					if (permission.localityPermissionId === uPermission.localityPermissionId){
						localityPermission.isChecked = true;
					}
				});
			}
			localityUserPermissions.push(localityPermission);
		});
		const localityUser = Object.assign({}, item);
		localityUser.localityUserPermissions = localityUserPermissions;
		return localityUser;
	}

  	hideEdit = (item) => {
  		this.setState({
            selectedAccount: this.convert(item),
            isEdit: true
        }, () => this.hideOrShowDialog(true));
  	}

  	hideCreate = () => {
		this.setState({
            selectedAccount: this.convert(Constants.EMPTY_LOCALITY_ACCOUNT),
            isEdit: false
        }, () => this.hideOrShowDialog(true));
  	}

  	fetchLocalityAccounts = (currentPage) => {
  		Api.getRequest(
			Constants.LOCALITY_ACCOUNT_API_PATH, 
			{
				localityName: this.state.searchCondition,
				pageSize: Constants.PAGE_SIZE,
				pageNo: currentPage
			})
			.then(res => {
				let totalCount = res.data.totalCount;
				let totalPage = Math.floor(totalCount === 0 ? 0 : totalCount / Constants.PAGE_SIZE + (totalCount % Constants.PAGE_SIZE > 0 ? 1 : 0));
				this.setState({
					localityAccounts: res.data.data,
					localityPermissions: res.data.localityPermissions,
					totalPage: totalPage
				});
				Api.setToken(res.headers.authorization);
			})
			.catch(error => {
				if (error.response && error.response.status === Constants.HTTP_STATUS_CODE_UNAUTHORIZED) {
			        Logout.bind(this)();
		      	}
			});
  	}

  	handleSearch = (currentPage) => {
  		this.fetchLocalityAccounts(currentPage);
  		this.setState({
  			currentPageNo: currentPage
  		});
  	}

  	componentDidMount = () => {
		this.fetchLocalityAccounts(1);
	}

  	render(){
	    return (
	    	<div className={Main.accountSearch}>
				<div className={Main.searchArea}>
					<span className={Main.span}>自治体アカウント検索</span>
					<input type="text" className={Main.text} ref="SearchCode" value={this.state.searchCondition} onChange={this.changeSearchCode} />
					<button className={Main.search} onClick={this.handleSearch.bind(this, 1)}>検索 </button>
					<button className={Main.new} onClick={this.hideCreate}>新規</button>
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
								<th>自治体名</th>
								<th>自治体ID</th>
								<th>自治体コード</th>
								<th>管理者ID</th>
								<th>編集</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.localityAccounts.map((item, idx) => (
									<tr key={idx}>
										<td>{idx + 1}</td>
										<td>{item.localityName}</td>
										<td>{item.localityId}</td>
										<td>{item.localityCode}</td>
										<td>{item.loginUserId}</td>
										<td><button type="button" className={Main.edit} onClick={() => this.hideEdit(item)}>編集</button></td>
									</tr>
								))
							}
						</tbody>
					</table>
				</div>
				<LocalityAccountEditor 
					isActive={this.state.isDialogActive} 
					hideDialog={this.hideOrShowDialog}  
					accountInfo={this.state.selectedAccount} 
					isEditMode={this.state.isEdit}
					handleSearch={this.handleSearch} />
			</div>
	    );
    }
}

export default LocalityAccountManagement;