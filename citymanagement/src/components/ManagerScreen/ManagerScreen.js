import React,{ Component } from 'react';
import Manager from '../../css/Manager.css';
import HospitalAccountManagement from './HospitalAccountManagement';
import CityAccountManagement from './CityAccountManagement';
import {Route, withRouter} from 'react-router-dom';

const BTN_BG_COLOR = 'btn_background_color';

class ManagerScreen extends Component{
	constructor(props){
		super(props);
		this.state={
			isDialogActive:false,
			hostipalBtnBgColor:BTN_BG_COLOR,
			cityBtnBgColor:''
		}
	}
 
 	componentDidMount = () => {
 		this.props.history.push('/index/hospitalAccount')
 	}

 	handleHospitalBtnClick = () => {
 		if (this.state.hostipalBtnBgColor !== BTN_BG_COLOR){
 			this.setState({
 				hostipalBtnBgColor:BTN_BG_COLOR,
 				cityBtnBgColor:''
 			},
 			() => this.props.history.push('/index/hospitalAccount'));
 		}
 	}

 	handleCityBtnClick = () => {
 		if (this.state.cityBtnBgColor !== BTN_BG_COLOR){
 			this.setState({
 				hostipalBtnBgColor:'',
 				cityBtnBgColor:BTN_BG_COLOR
 			},
 			() => this.props.history.push('/index/cityAccount'));
 		}
 	}

 	logout = () => {
 		this.props.history.push('/');
 	}

	render() {
		return(	
			<div className={Manager.management}>
	        	<div className={Manager.title_header}>
		            <div className={Manager.l_f}><span>予防接種管理システム</span></div>
		            <div className={Manager.r_f}>
		              <button type="button" className={Manager.btn_setup} >设定</button>
		              <button type="button" className={Manager.btn_logout} onClick={this.logout}>ログアウト</button>
		              <span style={{paddingRight:'20px'}}>ログインユーザー</span>
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
					<Route path='/index/cityAccount' component={CityAccountManagement} />
				</div>
			</div>
		);
	}
}

export default withRouter(ManagerScreen);
