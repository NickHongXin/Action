import React,{ Component } from 'react';
import Manager from '../../css/main.css';
import HospitalAccountManagement from './HospitalAccountManagement';
import LocalityAccountManagement from './LocalityAccountManagement';
import {Route, withRouter} from 'react-router-dom';
import Logout from '../function/Logout';
import GetLoginUserName from '../function/getLoginUserName';
import * as Constants from '../../common/Constants';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDialogActive: false,
			hostipalBtnBgColor: Constants.BTN_BG_COLOR,
			cityBtnBgColor: Constants.EMPTY_STRING
		}
	}
 
 	componentDidMount = () => {
 		if (GetLoginUserName()) {
 			this.props.history.push('/index/hospitalAccount');
 		} else {
 			Logout.bind(this)();
 		}
 	}

 	handleHospitalBtnClick = () => {
 		if (this.state.hostipalBtnBgColor !== Constants.BTN_BG_COLOR){
 			this.setState({
 				hostipalBtnBgColor:Constants.BTN_BG_COLOR,
 				cityBtnBgColor:Constants.EMPTY_STRING
 			},
 			() => this.props.history.push('/index/hospitalAccount'));
 		}
 	}

 	handleCityBtnClick = () => {
 		if (this.state.cityBtnBgColor !== Constants.BTN_BG_COLOR){
 			this.setState({
 				hostipalBtnBgColor:Constants.EMPTY_STRING,
 				cityBtnBgColor:Constants.BTN_BG_COLOR
 			},
 			() => this.props.history.push('/index/localityAccount'));
 		}
 	}

	render() {
		return(	
			<div className={Manager.management}>
	        	<div className={Manager.title_header}>
		            <div className={Manager.l_f}><span>予防接種管理システム</span></div>
		            <div className={Manager.r_f}>
		              <button type="button" className={Manager.btn_setup} >設定</button>
		              <button type="button" className={Manager.btn_logout} onClick={Logout.bind(this)}>ログアウト</button>
		              <span className={Manager.loginUser}>{GetLoginUserName()}</span>
		            </div>
	         	</div>
	         	<div className={Manager.emptyArea} />
	         	<div className={Manager.buttonArea}>
					<button className={`${Manager.hospital} ${Manager[this.state.hostipalBtnBgColor]}`} 
						onClick={this.handleHospitalBtnClick}>病院アカウント管理</button>
					<button className={`${Manager.hospital} ${Manager[this.state.cityBtnBgColor]}`} 
						onClick={this.handleCityBtnClick}>自治体アカウント管理</button>
				</div>
				<div className={Manager.content}>
					<Route path='/index/hospitalAccount' component={HospitalAccountManagement} />
					<Route path='/index/localityAccount' component={LocalityAccountManagement} />
				</div>
			</div>
		);
	}
}

export default withRouter(Main);
