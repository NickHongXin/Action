import React, { Component } from 'react';
import LocalityCss from '../../css/edit.css';
import Dialog from 'react-toolbox/lib/dialog';
import theme from '../../css/dialog.css';
import DeleteConfirmation from './DeleteConfirmation';
import SaveConfirmation from './SaveConfirmation';
import * as Api from '../../common/ApiCaller';

class LocalityAccountEditor extends Component {
	constructor(props){
	   	super(props);
	    this.state = {
      		isDeleteDialogActive:false,
      		isSaveDialogActive:false,
		    localityName:'',
		    localityId:0,
		    localityCode:'',
		    loginUserId:'',
		    displayName:'',
     		mailAddress:'',
      		password:'123456',
      		localityUserId:0,
		    localityUserPermissions:[],
      		errorMessage:'',
      		errorMessageLocalityName:'',
      		errorMessageLocalityCode:'',
      		errorMessageDisplayName:'',
      		errorMessageMailAddress:'',
      		errorMessagePassword:''
	    }
	}

	componentWillReceiveProps = (nextProps) =>{
		this.setState({
			localityName:nextProps.LocalityAccountInfo.localityName,
			localityId:nextProps.LocalityAccountInfo.localityId,
			localityCode:nextProps.LocalityAccountInfo.localityCode,
			loginUserId:nextProps.LocalityAccountInfo.loginUserId,
			displayName:nextProps.LocalityAccountInfo.displayName,
			mailAddress:nextProps.LocalityAccountInfo.mailAddress,
			password: '123456',
			localityUserId:nextProps.LocalityAccountInfo.localityUserId,
			localityUserPermissions:nextProps.LocalityAccountInfo.localityUserPermissions,
		})
	}

	
	handleChange = (name, event) => {
		this.setState({[name]: event.target.value});
		if(event.target.value !== '' && event.target.value !== null){
			switch(name) {
				case 'localityCode' :
					this.setState({errorMessageLocalityCode:''});
					break;
				case 'localityName' :
					this.setState({errorMessageLocalityName:''});
					break;
				case 'displayName' :
					this.setState({errorMessageDisplayName:''});
					break;
				case 'password' :
					this.setState({errorMessagePassword:''});
					break;
				case 'loginUserId':
					if(!this.state.loginUserId.match(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/i)){
						this.setState({errorMessageMailAddress: '電子メールでなければなりません'});
					}else{
						this.setState({errorMessageMailAddress:''});
					}
					break;
				default :
					break;
			}
		}
	}

	handleCheckTextValue = () => {
		let isHasError = false;
		if(this.state.localityCode === '' || this.state.localityCode === null){
			this.setState({errorMessageLocalityCode: '自治体コード は空です'});
			isHasError= true;
		}else{
			this.setState({errorMessageLocalityCode: ''});
		}
		if(this.state.localityName === '' || this.state.localityName === null){
			this.setState({errorMessageLocalityName: '自治体名 は空です'});
			isHasError= true;
		}else{
			this.setState({errorMessageLocalityName: ''});
		}
		if(this.state.displayName === '' || this.state.displayName === null){
			this.setState({errorMessageDisplayName: 'アカウント名 は空です'});
			isHasError= true;
		}else{
			this.setState({errorMessageDisplayName:''});
		}
		if(this.state.loginUserId === '' || this.state.loginUserId === null){
			this.setState({errorMessageMailAddress: 'ログインID は空です'});
			isHasError= true;
		}else{
			if(!this.state.loginUserId.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
				this.setState({errorMessageMailAddress: '電子メールでなければなりません'});
				isHasError= true;
			}else{
				this.setState({errorMessageMailAddress:''});
			}
		}
		if(this.state.password ==='' || this.state.password === null){
			this.setState({errorMessagePassword:'パスワード は空です'});
			isHasError= true;
		}else{
			this.setState({errorMessagePassword:''});
		}
		return isHasError;
	}

	handleCheckboxChange = (id) => {
    this.state.localityUserPermissions.map((item) => {
        if (item.localityPermissionId === id) {
            item.isChecked= !item.isChecked
        }
    });
     	this.setState({localityUserPermissions: this.state.localityUserPermissions.slice(0)});
  	}

  	handleDeleteConfirmation = (isActive) => {
	    this.setState({isDeleteDialogActive:isActive});
  	}

  	handleDeleteConfirmationYes = () =>{
	    Api.deleteRequest(`/api/LocalityAccount?localityUserId=${this.state.localityUserId}`)
	    .then((res) => {
	    	Api.setToken(res.headers.authorization);
	    	this.handleDeleteConfirmation(false);
	    	this.props.hideDialog();
	    })
	    .catch((error) => {
	    	if(error.response) {
	    		if (error.response.status === 401) {
	              sessionStorage.clear();
	              this.props.history.push('/');
	            } else {
	              this.handleDeleteConfirmation(false);
	              this.changeErrorMessage(error.response.data);
	            }
	    	}
    	
	    })
  	}

  	changeErrorMessage = (message) => {
	    this.setState({errorMessage: message});
	}

	handleCancel = () => {
	    this.changeErrorMessage('');
	    this.setState({
	    	errorMessageLocalityCode:'',
	    	errorMessageLocalityName:'',
	    	errorMessageDisplayName:'',
	    	errorMessageMailAddress:'',
	    	errorMessagePassword:''
	    });
	    this.props.hideDialog();
	  }

	handleSaveConfirmation = (isActive) => {
		this.changeErrorMessage('');
		if(this.handleCheckTextValue()){
			return false;
		}
	    this.setState({isSaveDialogActive:isActive});
  	}

  	handleSaveConfirmationYes = () => {
	    const localityPermissionIds = [];
	    this.state.localityUserPermissions.map(item => {
	    	if(item.isChecked) {
	    		localityPermissionIds.push(item.localityPermissionId);
	    	}
	    });
	    if(this.props.isEditMode){
	    	Api.putRequest(
	    		'/api/LocalityAccount',
	    		{
	    			localityUserId:this.state.localityUserId,
	    			mailAddress:this.state.loginUserId,
	    			password:this.state.password,
	    			displayName:this.state.displayName,
	    			localityId:this.state.localityId,
	    			localityCode:this.state.localityCode,
	    			localityName:this.state.localityName,
	    			localityPermissionIds:localityPermissionIds
	    	})
	    	.then((res) => {
		        Api.setToken(res.headers.authorization);
		        this.handleSaveConfirmation(false);
		        this.props.hideDialog(); 
		    })
	    	.catch((error) => {
		         if (error.response) {
		            if (error.response.status === 401) {
		              sessionStorage.clear();
		              this.props.history.push('/');
		            } else {
		              this.handleSaveConfirmation(false);
		              this.changeErrorMessage(error.response.data);
		            }
		        }
		    });
	    }else{
	    	Api.postRequest(
	    		'/api/LocalityAccount',
	    		{
	    			localityPermissionIds:localityPermissionIds,
	    			mailAddress:this.state.loginUserId,
	    			password:this.state.password,
	    			displayName:this.state.displayName,
	    			localityCode:this.state.localityCode
	    			
	    		})
	    	.then((res) => {
	    		Api.setToken(res.headers.authorization);
	    		this.handleSaveConfirmation(false);
	    		this.props.hideDialog();
	    	})
	    	.catch((error) => {
	    		if (error.response) {
		            if (error.response.status === 401) {
		              sessionStorage.clear();
		              this.props.history.push('/');
		            } else {
		              this.handleSaveConfirmation(false);
		              this.changeErrorMessage(error.response.data);
		            }
		        }
	    	});
	    }
  	}

  	render(){ 		
    	return (
	        <Dialog theme={theme} active={this.props.isActive} onOverlayClick={this.props.hideDialog} onEscKeyDown={this.props.hideDialog}>
	            <div className={LocalityCss.errorMessage}>{this.state.errorMessage}</div>
	            <table className={LocalityCss.htable} align="center">
	              <tbody>
	                <tr>
	                    <td>■ 自治体ID</td>
	                    <td>
	                    	{
	                    	this.props.isEditMode
							 ? this.state.localityId
	                    	 : ''
	                    	}     
	                    </td>    
	                </tr>
	                <tr>
	                    <td>■ 自治体コード</td>
	                    <td><input type="text" className={LocalityCss.text} value={this.state.localityCode} onChange={this.handleChange.bind(this, 'localityCode')} /><br/>
	                    	<span className={LocalityCss.errorMessage}>{this.state.errorMessageLocalityCode}</span>
	                    </td>
	                </tr>
	                
	                <tr>
	                    <td>■ 自治体名</td>
	                    <td><input type="text" className={LocalityCss.text} value={this.state.localityName} onChange={this.handleChange.bind(this, 'localityName')} /><br/>
	                    	<span className={LocalityCss.errorMessage}>{this.state.errorMessageLocalityName}</span>
	                    </td> 	
	                </tr>
	                <tr>
	                    <td>■ アカウント名</td>
	                    <td><input type="text" className={LocalityCss.text} value={this.state.displayName} onChange={this.handleChange.bind(this, 'displayName')} /><br/>
	                    	<span className={LocalityCss.errorMessage}>{this.state.errorMessageDisplayName}</span>
	                    </td>
	                </tr>
	                <tr>
	                    <td>■ ログインID</td>
	                    <td><input type="text" className={LocalityCss.text} value={this.state.loginUserId} onChange={this.handleChange.bind(this, 'loginUserId')} /><br/>
	                    	<span className={LocalityCss.errorMessage}>{this.state.errorMessageMailAddress}</span>
	                    </td>
	                </tr>
	                <tr>
	                    <td>■ パスワード</td>
	                    <td><input type="text" className={LocalityCss.text} value={this.state.password} onChange={this.handleChange.bind(this, 'password')} /><br/>
	                    	<span className={LocalityCss.errorMessage}>{this.state.errorMessagePassword}</span>
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
	                    					onChange={this.handleCheckboxChange.bind(this, item.localityPermissionId)}/>
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
								 ? <input type="button" value="削除"  onClick={this.handleDeleteConfirmation.bind(this, true)}/>
		                    	 : ''
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

export default LocalityAccountEditor;