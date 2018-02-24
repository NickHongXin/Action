import React,{ Component } from 'react';
import Manager from '../../css/Manager.css';
import HospitalAccountEditorTable from './HospitalAccountEditor';

class HospitalAccountManagement extends Component {
	constructor(props){
		super(props);
		this.state={
			isDialogActive:false,
			hospitalAccounts:[]
		}
	}

	hideOrShowDialog = () => {
	   this.setState({isDialogActive:!this.state.isDialogActive})
	}

	componentDidMount = () => {
		const hospitalAccounts = [
			{orgName:'病院1',orgId:'1',orgCode:'123',managerId:'01',cityCode:'123'},
			{orgName:'病院2',orgId:'2',orgCode:'234',managerId:'02',cityCode:'234'},
			{orgName:'病院3',orgId:'3',orgCode:'345',managerId:'03',cityCode:'345'},
			{orgName:'病院4',orgId:'4',orgCode:'456',managerId:'04',cityCode:'456'},
			{orgName:'病院5',orgId:'5',orgCode:'567',managerId:'05',cityCode:'567'},
			{orgName:'病院6',orgId:'6',orgCode:'678',managerId:'06',cityCode:'678'},
			{orgName:'病院7',orgId:'7',orgCode:'789',managerId:'07',cityCode:'789'},
			{orgName:'病院8',orgId:'8',orgCode:'890',managerId:'08',cityCode:'890'},
			{orgName:'病院9',orgId:'9',orgCode:'901',managerId:'09',cityCode:'901'},
			{orgName:'病院10',orgId:'10',orgCode:'012',managerId:'010',cityCode:'012'}
		];

		this.setState({hospitalAccounts: hospitalAccounts});
	}

  	render(){
	    return (
	    	<div className={Manager.accountSearch}>
				<div className={Manager.searchArea}>
					<span className={Manager.span}>病院アカウント検索</span>
					<input type="text" className={Manager.text} />
					<button className={Manager.search} >検索 </button>
					<button className={Manager.new} onClick={() => this.hideOrShowDialog(true)}>新規</button>
				</div>
				
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
										<td>{item.orgName}</td>
										<td>{item.orgId}</td>
										<td>{item.orgCode}</td>
										<td>{item.managerId}</td>
										<td>{item.cityCode}</td>
										<td><button type="button" className={Manager.edit} onClick={() => this.hideOrShowDialog(true)}>編集</button></td>
									</tr>
								))
							}
						</tbody>
					</table>
				</div>
				< HospitalAccountEditorTable isActive={this.state.isDialogActive} hideDialog={this.hideOrShowDialog} />
	    	</div>
	    );
  	}
}

export default HospitalAccountManagement;