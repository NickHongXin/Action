import React,{ Component } from 'react';
import Manager from '../../css/main.css';
import Pagination from './Pagination';
import LocalityAccountEditor from './LocalityAccountEditor';
import * as Api from '../../common/ApiCaller';

const EMPTY_ACCOUNT = {
	localityName:'',
	localityId:0,
	localityCode:'',
	mailAddress:'',
	displayName:'',
	localityUserId:'',
	localityUserPermissions:[]
}

class LocalityAccountManagement extends Component {
	constructor(props){
		super(props);
		this.state = {
			isDialogActive:false,
			localityAccounts:[],
			localityPermissions:[],
			selectlocalityAccounts:EMPTY_ACCOUNT,
			selectCityAccounts:{cityName:'',cityId:'',cityCode:'',managerId:''},
			searchCondition:'',
			isEdit:false,
			pageSize:5,
			currentPageNo:1,
			totalPage:0,
			localityPermissions:[]
		}
	}
	changeSearchCode = () => {
		this.setState({searchCondition:this.refs.SearchCode.value})
	}

    hideOrShowDialog = () => {
	    this.setState({isDialogActive:!this.state.isDialogActive})
  	}

  	convert = (item) => {
  		const localityUserPermissions = [];
		this.state.localityPermissions.map(permission => {
			let tempPermission = Object.assign({}, permission)
			tempPermission['isChecked']=false;
			if (item && item.localityUserPermissions){
				item.localityUserPermissions.map(uPermission => {
					if (permission.localityPermissionId === uPermission.localityPermissionId){
						tempPermission.isChecked = true;
					}
				});
			}
			localityUserPermissions.push(tempPermission);
		});
		const localityUser = Object.assign({}, item);
		localityUser.localityUserPermissions = localityUserPermissions;
		return localityUser;
  	}

  	handleEdit = (item) => {
  		this.setState({
            selectlocalityAccounts:this.convert(item),
            isEdit:true
        });
  		this.hideOrShowDialog();
  	}

  	handleCreate = () => {
		this.setState({
            selectlocalityAccounts:this.convert(EMPTY_ACCOUNT),
            isEdit:false
        });
  		this.hideOrShowDialog();
  	}

  	callLocalityAccountApi = (currentPage) => {
  		Api.getRequest(
  			'/api/localityAccount',
  			{
  				localityName: this.state.searchCondition,
  				pageSize:this.state.pageSize,
  				pageNo:currentPage
  			})
  			.then(res =>{
  				let totalCount = res.data.totalCount;
  				let totalPage = Math.floor(totalCount === 0 ? 0:totalCount / this.state.pageSize + (totalCount % this.state.pageSize > 0 ? 1 :0));
  				this.setState({
  					localityAccounts:res.data.data,
  					localityPermissions:res.data.localityPermissions,
  					totalPage:totalPage
  				});
  				Api.setToken(res.headers.authorization);
  			})
  			.catch(error => {
  				if(error.response && error.response.status === 401) {
  					sessionStorage.clear();
  					this.props.history.push('/');
  				}
  			});
  	}

  	handleSearch = (currentPage) => {
  		this.callLocalityAccountApi(currentPage);
  		this.setState({
  			currentPageNo:currentPage
  		})
  	}

  	componentDidMount = () => {
  		this.callLocalityAccountApi(1);
  	}

  	render(){
	    return (
	    	<div className={Manager.accountSearch}>
				<div className={Manager.searchArea}>
					<span className={Manager.span}>自治体アカウント検索</span>
					<input type="text" className={Manager.text} ref="SearchCode" value={this.state.searchCondition} onChange={this.changeSearchCode}/>
					<button className={Manager.search} onClick={this.handleSearch.bind(this,1)} >検索 </button>
					<button className={Manager.new} onClick={this.handleCreate}>新規</button>
				</div>
				< Pagination 
					className={Manager.pageMargin}
					totalPage={this.state.totalPage}
					currentPage={this.state.currentPageNo}
					handleSearch={this.handleSearch} />
				<div className={Manager.listArea}>
					<table className={Manager.intable}>
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
										<td><button type="button" className={Manager.edit} onClick={this.handleEdit.bind(this,item)}>編集</button></td>
									</tr>
								))

							}
						</tbody>
					</table>
				</div>
				<LocalityAccountEditor 
				isActive={this.state.isDialogActive} 
				hideDialog={this.hideOrShowDialog}  
				localityInfo={this.state.selectlocalityAccounts} 
				isEditMode={this.state.isEdit} />
			</div>
	    );
    }
}

export default LocalityAccountManagement;