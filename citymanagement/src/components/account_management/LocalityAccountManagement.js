import React,{ Component } from 'react';
import Manager from '../../css/main.css';
import Pagination from './Pagination';
import LocalityAccountEditor from './LocalityAccountEditor';

class LocalityAccountManagement extends Component {
	constructor(props){
		super(props);
		this.state = {
			isDialogActive:false,
			cityAccounts:[],
			selectCityAccounts:{cityName:'',cityId:'',cityCode:'',managerId:''},
			searchCondition:'',
			isEdit:false
		}
	}
	changeSearchCode = () => {
		this.setState({searchCondition:this.refs.SearchCode.value})
	}

    hideOrShowDialog = () => {
	    this.setState({isDialogActive:!this.state.isDialogActive})
  	}
  	hideEdit = (item) => {
  		this.setState({
            selectCityAccounts:item,
            isEdit:true
        });
  		this.hideOrShowDialog();
  	}
  	hideCreate = () => {
		this.setState({
            selectCityAccounts:{},
            isEdit:false
        });
  		this.hideOrShowDialog();
  	}
  	componentDidMount = () => {
		const cityAccounts = [
			{cityName:'A市',cityId:'1',cityCode:'123',managerId:'01'},
			{cityName:'B市',cityId:'2',cityCode:'234',managerId:'02'},
			{cityName:'C市',cityId:'3',cityCode:'345',managerId:'03'},
			{cityName:'D市',cityId:'4',cityCode:'456',managerId:'04'},
			{cityName:'E市',cityId:'5',cityCode:'567',managerId:'05'},
			{cityName:'F市',cityId:'6',cityCode:'678',managerId:'06'},
			{cityName:'G市',cityId:'7',cityCode:'789',managerId:'07'},
			{cityName:'H市',cityId:'8',cityCode:'890',managerId:'08'},
			{cityName:'I市',cityId:'9',cityCode:'901',managerId:'09'},
			{cityName:'J市',cityId:'10',cityCode:'012',managerId:'010'}
		];
		this.setState({cityAccounts: cityAccounts});
	}

  	render(){
	    return (
	    	<div className={Manager.accountSearch}>
				<div className={Manager.searchArea}>
					<span className={Manager.span}>自治体アカウント検索</span>
					<input type="text" className={Manager.text} ref="SearchCode" value={this.state.searchCondition} onChange={this.changeSearchCode}/>
					<button className={Manager.search} >検索 </button>
					<button className={Manager.new} onClick={this.hideCreate}>新規</button>
				</div>
				< Pagination />
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
								this.state.cityAccounts.map((item, idx) => (
									<tr key={idx}>
										<td>{idx + 1}</td>
										<td>{item.cityName}</td>
										<td>{item.cityId}</td>
										<td>{item.cityCode}</td>
										<td>{item.managerId}</td>
										<td><button type="button" className={Manager.edit} onClick={() => this.hideEdit(item)}>編集</button></td>
									</tr>
								))
							}
						</tbody>
					</table>
				</div>
				<LocalityAccountEditor isActive={this.state.isDialogActive} hideDialog={this.hideOrShowDialog}  CityInfo={this.state.selectCityAccounts} isEditMode={this.state.isEdit}/>
			</div>
	    );
    }
}

export default LocalityAccountManagement;