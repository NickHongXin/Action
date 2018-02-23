import React,{ Component } from 'react';

import Manager from '../../css/Manager.css';
import HospitalAccountManagement from './HospitalAccountManagement';
import CityAccountManagement from './CityAccountManagement';
import {Route, withRouter} from 'react-router-dom';

class ManagerScreen extends Component{
	constructor(props){
		super(props);
		this.state={
			isDialogActive:false,
		}
	}
 
 	componentDidMount = () => {
 		this.props.history.push('/index/hospitalAccount')
 	}


	render() {
		return(
			
			<div>
			<table className={Manager.tableMain} align="center">
				<tbody>
					<tr>
						<td className={Manager.margin12}>
				        	<div >
					            <div className={Manager.l_f}>予防接種管理システム</div>
					            <div className={Manager.user}>ログインユーザー</div>
					            <div className={Manager.r_f}>
					              <button type="button" className={Manager.bt1} >设定</button>
					              <button type="button" className={Manager.bt2} >ログアウト</button>
					            </div>
				            	<div></div>
				         	</div>
			       		</td>
					</tr>
					<tr>
						<td>
							<div className={Manager.sp}/>
						</td>
					</tr>
					<tr>
						<td>
							<button id="btn1" className={Manager.Hospital} onClick={()=>this.props.history.push('/index/hospitalAccount')}>病院アカウント管理</button>
							<button id="btn2" className={Manager.Hospital} onClick={()=>this.props.history.push('/index/cityAccount')}>自治体アカウント管理</button>
						</td>
					</tr>
					
					<Route path='/index/hospitalAccount' component={HospitalAccountManagement} />
					<Route path='/index/cityAccount' component={CityAccountManagement} />
					
				</tbody>

			</table>
			</div>
		);
	}
}
export default withRouter(ManagerScreen);
