import React, { Component } from 'react';
import EditCss from '../../css/edit.css';
import Dialog from 'react-toolbox/lib/dialog';
import theme from '../../css/dialog.css';
import DeleteConfirmation from './DeleteConfirmation';
import SaveConfirmation from './SaveConfirmation';
import * as Constants from '../../common/Constants';
import Logout from '../function/Logout';
import * as Api from '../../common/ApiCaller';
import {withRouter} from 'react-router-dom';
import * as Validations from '../function/Validate';

class LocalityAccountEditor extends Component {
	constructor(props) {
	   	super(props);
	    this.state = {
      		isDeleteDialogActive: false,
      		isSaveDialogActive: false,
		    localityName: Constants.EMPTY_STRING,
		    localityId: 0,
		    localityCode: Constants.EMPTY_STRING,
		    displayName: Constants.EMPTY_STRING,
		    loginUserId: Constants.EMPTY_STRING,
		    password: Constants.EMPTY_STRING,
		    localityUserId: 0,
		    localityUserPermissions: []
	    }
	}

	componentWillReceiveProps = (nextProps) =>{
		this.setState(Object.assign({}, nextProps.accountInfo));
	}

	handleChange = (name, event) => {
		this.changeErrorMessage(Constants.EMPTY_STRING);
		Validations.clearError.bind(this, name)();
		this.setState({[name]: event.target.value});
	}

	handleCheckbox = (id) => {
		this.state.localityUserPermissions.map((item)=>{
			if (item.localityPermissionId === id) {
				item.isChecked = !item.isChecked
			}
		});
	  	this.setState({localityUserPermissions: this.state.localityUserPermissions.slice(0)});
	}

  	handleDeleteConfirmation = (isActive) => {
  		this.changeErrorMessage(Constants.EMPTY_STRING);
	    this.setState({isDeleteDialogActive: isActive});
  	}

  	handleDeleteConfirmationYes = () => {
  		Api.deleteRequest(Constants.LOCALITY_ACCOUNT_API_PATH,
  			{
  				localityUserId: this.state.localityUserId
  			})
	        .then((res) => {
	          Api.setToken(res.headers.authorization);
	          this.handleDeleteConfirmation(false);
	          this.props.hideDialog(false);
	          this.props.handleSearch(1);
	        })
	        .catch((error) => {
	          if (error.response) {
	            if (error.response.status === Constants.HTTP_STATUS_CODE_UNAUTHORIZED) {
	              Logout.bind(this)();
	            } else {
	              this.handleDeleteConfirmation(false);
	              this.changeErrorMessage(error.response.data);
	            }
	          }
	      }); 
  	}

	handleSaveConfirmation = (isActive) => {
		if (this.handleValidate()) {
	      return;
	    }
		this.changeErrorMessage(Constants.EMPTY_STRING);
	    this.setState({isSaveDialogActive: isActive});
  	}

  	handleSaveConfirmationYes = () => {
  		const localityPermissionIds = [];
	    this.state.localityUserPermissions.map(item => {
	      if (item.isChecked) {
	        localityPermissionIds.push(item.localityPermissionId);
	      }
	    });
	    this.props.isEditMode ? 
	      Api.putRequest(
	        Constants.LOCALITY_ACCOUNT_API_PATH, 
	        {
	          localityId: this.state.localityId,
	          localityCode: this.state.localityCode,
	          localityName: this.state.localityName,
	          displayName: this.state.displayName,
	          mailAddress: this.state.loginUserId,
	          password: this.state.password,
	          localityUserId: this.state.localityUserId,
	          localityPermissionIds: localityPermissionIds
	        })
	        .then(res => this.handleSaveSuccess(res))
	        .catch(err => this.handleSaveError(err))
	    : Api.postRequest(
	        Constants.LOCALITY_ACCOUNT_API_PATH, 
	        {
	          localityCode: this.state.localityCode,
	          localityName: this.state.localityName,
	          displayName: this.state.displayName,
	          mailAddress: this.state.loginUserId,
	          password: this.state.password,
	          localityPermissionIds: localityPermissionIds
	        })
	        .then(res => this.handleSaveSuccess(res))
	        .catch(err => this.handleSaveError(err));
  	}

  	handleSaveSuccess = (res) => {
	    Api.setToken(res.headers.authorization);
	    this.handleSaveConfirmation(false);
	    this.props.hideDialog(false);
	    this.props.handleSearch(1);
  	}

 	handleSaveError = (error) => {
	    if (error.response) {
	      if (error.response.status === Constants.HTTP_STATUS_CODE_UNAUTHORIZED) {
	        Logout.bind(this)();
	      } else {
	        this.handleSaveConfirmation(false);
	        this.changeErrorMessage(error.response.data);
	      }
	    }
  	}

  	changeErrorMessage = (message) => {
	    this.setState({apiError: message});
  	}

  	handleCancel = () => {
  		Validations.clearError.bind(this, 'all')();
	    this.changeErrorMessage(Constants.EMPTY_STRING);
	    this.props.hideDialog(false);
  	}

  	handleValidate = () => {
    return Validations.isEmpty.bind(this, 'localityCode', this.state.localityCode)()
      | Validations.isEmpty.bind(this, 'localityName', this.state.localityName)()
      | Validations.isEmpty.bind(this, 'displayName', this.state.displayName)()
      | Validations.isEmpty.bind(this, 'loginUserId', this.state.loginUserId)()
      | Validations.isEmpty.bind(this, 'password', this.state.password)() ? true : false;
  }

  	render(){ 		
    	return (
	        <Dialog theme={theme} active={this.props.isActive}>
	            <div className={EditCss.errorMessage}>{this.state.apiError}</div>
	            <table className={EditCss.htable} align="center">
	              <tbody>
	                <tr>
	                    <td>■ 自治体ID</td>
	                    <td>
	                    	{this.props.isEditMode ? this.state.localityId : Constants.EMPTY_STRING}     
	                    </td>    
	                </tr>
	                <tr>
	                    <td>■ 自治体コード</td>
	                    <td>
	                    	<input type="text" className={EditCss.text} value={this.state.localityCode} onChange={this.handleChange.bind(this, 'localityCode')} />
	                    	<br /><span className={EditCss.errorMessage}>{this.state.localityCodeError}</span>
                    	</td>
	                </tr>
	                <tr>
	                    <td>■ 自治体名</td>
	                    <td>
	                    	<input type="text" className={EditCss.text} value={this.state.localityName} onChange={this.handleChange.bind(this, 'localityName')} />
	                    	<br /><span className={EditCss.errorMessage}>{this.state.localityNameError}</span>
                    	</td>
	                </tr>
	                <tr>
	                    <td>■ アカウント名</td>
	                    <td>
	                    	<input type="text" className={EditCss.text} value={this.state.displayName} onChange={this.handleChange.bind(this, 'displayName')} />
	                    	<br /><span className={EditCss.errorMessage}>{this.state.displayNameError}</span>
                    	</td>
	                </tr>
	                <tr>
	                    <td>■ ログインID</td>
	                    <td>
	                    	<input type="text" className={EditCss.text} value={this.state.loginUserId} onChange={this.handleChange.bind(this, 'loginUserId')} />
	                    	<br /><span className={EditCss.errorMessage}>{this.state.mailAddressError}</span>
                    	</td>
	                </tr>
	                <tr>
	                    <td>■ パスワード</td>
	                    <td>
	                    	<input type="text" className={EditCss.text} value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
	                    	<br /><span className={EditCss.errorMessage}>{this.state.passwordError}</span>
                    	</td>
	                </tr>
	                <tr>
	                    <td>■ 権限</td>
	                    <td>
	                    	{
	                    		this.state.localityUserPermissions.map((item,idx) => {
	                    			return (
	                    			<div key={idx}>
	                    				<input type='checkbox' 
	                    					checked={item.isChecked}
	                    					onChange={this.handleCheckbox.bind(this, item.localityPermissionId)}/>
	                    				{item.localityPermissiondescription}<br/>
                    				</div>)
	                    		})
	                    	}
	                    </td>    
	                </tr>
	                <tr></tr>
	                <tr>
	                    <td>
	                    	{
		                    	this.props.isEditMode
								 ? <input type="button" value="削除" onClick={this.handleDeleteConfirmation.bind(this, true)} />
		                    	 : Constants.EMPTY_STRING
	                    	}
	                    </td>
	                    <td >
	                        <input type="button" value="完了" onClick={this.handleSaveConfirmation.bind(this, true)} />
	                        <input type="button" value="キャンセル" onClick={this.handleCancel} />
	                    </td>
	                </tr>
	              </tbody>
	            </table>
	            <DeleteConfirmation  
	              isActive={this.state.isDeleteDialogActive} 
	              handleDialogYes={this.handleDeleteConfirmationYes}
	              handleDialogNo={this.handleDeleteConfirmation.bind(this, false)} />
	            <SaveConfirmation 
	              isActive={this.state.isSaveDialogActive}
	              handleDialogYes={this.handleSaveConfirmationYes} 
	              handleDialogNo={this.handleSaveConfirmation.bind(this, false)} />
	        </Dialog>
    );
  }
}

export default withRouter(LocalityAccountEditor);