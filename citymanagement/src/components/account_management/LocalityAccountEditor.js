import React, { Component } from 'react';
import HospitalCss from '../../css/edit.css';
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
            localityUserId:0,
            displayName:'',
            localityCode:'',
            mailAddress:'',
            loginUserId:'',
            password:'',
            localityUserPermissions:[],
            errorMessage:'',
            localityNameValid:'',
            localityIdValid:'',
            localityUserIdValid:'',
            localityCodeValid:'',
            mailAddressValid:'',
            loginUserIdValid:'',
            passwordValid:'',
            displayNameValid:'',

        }
    }

    handleClick ()  {
      let errorExit = false;
       if(this.state.localityCode === ""||this.state.localityCode === null)
       {
            this.setState
            ({
                localityCodeValid: "* localityCode不能为空"
            })
            errorExit = true;
       }else if(this.state.localityName === ""||this.state.localityName === null)
       {
            this.setState({
                localityCodeValid: "",
                localityNameValid: "* localityName不能为空"
            })
             errorExit = true;
        }
       
         else if(this.state.displayName === ""||this.state.displayName === null)
       {
            this.setState({
                localityCodeValid: "",
                localityNameValid: "",
                displayNameValid:"displayName不能为空"
            })
             errorExit = true;
        }
          else if(this.state.mailAddress === ""||this.state.mailAddress === null)
       {
            this.setState({
                localityCodeValid: "",
                localityNameValid: "",
                displayNameValid:"",
                mailAddressValid:"mailAddress不能为空",
            })
             errorExit = true;
        }
        else if(this.state.password === ""||this.state.password === null)
       {
            this.setState({
                localityCodeValid: "",
                localityNameValid: "",
                displayNameValid:"",
                mailAddressValid:" ",
                passwordValid:"password不能为空",
            })
             errorExit = true;
        }
        else
        {
            this.setState({ //清除help-block提示文字
                 localityCodeValid: "",
                 localityNameValid: "",
                 displayNameValid:"",
                 mailAddressValid:"",
                 passwordValid:"",
            });
        
      }
      return errorExit;
    }


    componentWillReceiveProps = (nextProps) =>{
        this.setState({
            localityName:nextProps.CityInfo.localityName,
            localityId:nextProps.CityInfo.localityId,
            localityCode:nextProps.CityInfo.localityCode,
            mailAddress:nextProps.CityInfo.loginUserId,
            displayName:nextProps.CityInfo.displayName,
            password:'123456',
            localityUserId:nextProps.CityInfo.localityUserId,
            localityUserPermissions:nextProps.CityInfo.localityUserPermissions
        })
    }


    handleChange = (name, event) => {
        this.setState({[name]: event.target.value});
        if(event.target.value !=''&&event.target.value !=null){
          if(name==='localityCode')
          {
            this.setState({ localityCodeValid: ""});
          }
          if(name==='localityName')
          {
            this.setState({ localityNameValid: ""});
          }
           if(name==='displayName')
          {
            this.setState({ displayNameValid: ""});
          }
          if(name==='mailAddress')
          {
          if(!this.state.mailAddress.match(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/i))
            {
             this.setState({mailAddressValid: 'ログインID不合法。'});
            }else{
                    this.setState({mailAddressValid:''});
                }
          }
          if(name==='password')
          {
            this.setState({passwordValid:''});
          }
        }

    }

    handleCheckboxChange = (id) => {
        this.state.localityUserPermissions.map((item)=>{
            if (item.localityPermissionId === id) {
                item.isChecked= !item.isChecked
            }
        })
          this.setState({localityUserPermissions: this.state.localityUserPermissions.slice(0)})
    }

     handleDeleteConfirmation = (isActive) => {
         this.changeErrorMessage('');
        this.setState({isDeleteDialogActive:isActive});
     }

     handleDeleteConfirmationYes = () => {
      debugger;
    Api.deleteRequest(`/api/localityAccount?localityUserId=${this.state.localityUserId}`)
        .then((res) => {
          Api.setToken(res.headers.authorization);
          this.handleDeleteConfirmation(false);
          this.props.hideDialog(); 
        })
       .catch((error) => {
         if (error.response) {
           if (error.response.status === 401) {
             sessionStorage.clear();
             this.props.history.push('/');
           } else {
             this.handleDeleteConfirmation(false);
             this.changeErrorMessage(error.response.data);
           }
         }
     });
     }
     handleSaveConfirmation = (isActive) => {

        this.changeErrorMessage('');
        if(this.handleClick())
        {
          return false;
        }
        this.setState({isSaveDialogActive:isActive});
     }

     handleSaveConfirmationYes = () =>{
        //debugger;
        const localityPermissionIds = [];
        this.state.localityUserPermissions.map(item => {
            if(item.isChecked) {
                localityPermissionIds.push(item.localityPermissionId);
            }
        });
        if (this.props.isEditMode) {
            Api.putRequest(
                '/api/LocalityAccount',
                {
                    localityId: this.state.localityId,
                    localityCode: this.state.localityCode,
                    localityName: this.state.localityName,
                    displayName: this.state.displayName,
                    mailAddress: this.state.mailAddress,
                    password: this.state.password,
                    localityUserId: this.state.localityUserId,
                    localityPermissionIds: localityPermissionIds
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
                '/api/localityAccount',
                {
                    localityCode: this.state.localityCode,
                    localityName: this.state.localityName,
                    displayName: this.state.displayName,
                    mailAddress: this.state.mailAddress,
                    password: this.state.password,
                    localityPermissionIds: localityPermissionIds
                })
                .then((res) =>{
                    Api.setToken(res.headers.authorization);
                    this.handleSaveConfirmation(false);
                    this.props.hideDialog();
                })
                .catch((error) =>{
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



  changeErrorMessage = (message) => {
   this.setState({errorMessage: message});
 }

     handleCancel = () => {
   this.changeErrorMessage('');
   this.props.hideDialog();
 }

  	render(){         
       return (
            <Dialog theme={theme} active={this.props.isActive} onOverlayClick={this.props.hideDialog} onEscKeyDown={this.props.hideDialog}>
                <div className={HospitalCss.errorMessage}>{this.state.errorMessage}</div>
                <table className={HospitalCss.htable} align="center">
                  <tbody>
                    <tr>
                        <td>■ 自治体ID</td>
                        <td>{this.props.isEditMode ? this.state.localityId : ''}</td>    
                    </tr>
                  
                    <tr>
                        <td>■ 自治体コード</td>
                        <td><input type="text" className={HospitalCss.text} value={this.state.localityCode} onChange={this.handleChange.bind(this, 'localityCode')} /></td> 
                    </tr>
                     <span>{this.state.localityCodeValid}</span>
                    
                    <tr>
                        <td>■ 自治体名</td>
                        <td><input type="text" className={HospitalCss.text} value={this.state.localityName} onChange={this.handleChange.bind(this, 'localityName')} /></td>    
                    </tr>
                    <span>{this.state.localityNameValid}</span>
                    
                    <tr>
                        <td>■ アカウント名</td>
                        <td><input type="text" className={HospitalCss.text}  value={this.state.displayName} onChange={this.handleChange.bind(this, 'displayName')} /></td>
                    </tr>
                    <span>{this.state.displayNameValid}</span>
                   
                    <tr>
                        <td>■ ログインID</td>
                        <td><input type="text" className={HospitalCss.text} value={this.state.mailAddress} onChange={this.handleChange.bind(this, 'mailAddress')} /></td>    
                     </tr>
                      <span>{this.state.mailAddressValid}</span>

                    <tr>
                        <td>■ パスワード</td>
                        <td><input type="text" className={HospitalCss.text} value={this.state.password} onChange={this.handleChange.bind(this, 'password')} /></td>
                    </tr>
                    <span>{this.state.passwordValid}</span>
                    
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
                                        {item.localityPermissiondescription}<br />
                                   </div>)
                                })
                            }
                        </td>    
                    </tr>
                    <tr>
                        <td>
                            {
                                this.props.isEditMode
                                 ? <input type="button" value="削除" onClick={this.handleDeleteConfirmation.bind(this, true)}/>
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