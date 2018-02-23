import React,{ Component } from 'react';
import Manager from '../../css/Manager.css';
import CityAccountEditor from './CityAccountEditor';

class CityAccountManagement extends Component {
	constructor(props){
			super(props);
			this.state={
				isDialogActive:false,
			}
		}
    hideOrShowDialog = () => {
	    this.setState({isDialogActive:!this.state.isDialogActive})
	  }
  	
  	render(){
	    return (
	    	<tr><td>
	    	<div className={Manager.HospitalSe}>
				<div className={Manager.from}>
					自治体アカウント検索 <input type="text" className={Manager.text} />
					<button className={Manager.select} >検索 </button>
				</div>
					<button className={Manager.new} onClick={() => this.hideOrShowDialog(true)}>新規</button>
				<div className={Manager.sp} />
				<table className={Manager.intable} align="center">
					<thead>
						<tr className={Manager.trth}>
							<th>#</th>
							<th>自治体名</th>
							<th>自治体ID</th>
							<th>自治体コード</th>
							<th>管理者ID</th>
							<th>編集</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td><td>A市</td><td></td><td></td><td></td>
							<td><button type="button" className={Manager.edit} onClick={() => this.hideOrShowDialog(true)}>編集</button></td>
						</tr>
						<tr>
							<td>2</td><td>B市</td><td></td><td></td><td></td>
							<td><button type="button" className={Manager.edit} onClick={() => this.hideOrShowDialog(true)}>編集</button></td>
						</tr>
						<tr>
							<td>3</td><td>C市</td><td></td><td></td><td></td>
							<td><button type="button" className={Manager.edit} onClick={() => this.hideOrShowDialog(true)}>編集</button></td>
						</tr>
						<tr>
							<td>4</td><td>D市</td><td></td><td></td><td></td>
							<td><button type="button" className={Manager.edit} onClick={() => this.hideOrShowDialog(true)}>編集</button></td>
						</tr>
						<tr>
							<td>5</td><td>E市</td><td></td><td></td><td></td>
							<td><button type="button" className={Manager.edit} onClick={() => this.hideOrShowDialog(true)}>編集</button></td>
						</tr>
						<tr>
							<td>6</td><td>F市</td><td></td><td></td><td></td>
							<td><button type="button" className={Manager.edit} onClick={() => this.hideOrShowDialog(true)}>編集</button></td>
						</tr>
					</tbody>
				</table>
				<CityAccountEditor isActive={this.state.isDialogActive} hideDialog={this.hideOrShowDialog}  />
			</div>
	    	</td></tr>
	    );
  }
}


export default CityAccountManagement;