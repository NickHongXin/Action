import React, { Component } from 'react';
import HospitalCss from '../../css/edit.css';
import Dialog from 'react-toolbox/lib/dialog';
import DeleteConfirmation from './DeleteConfirmation';
import SaveConfirmation from './SaveConfirmation';
import theme from '../../css/dialog.css';
import * as Api from '../../common/ApiCaller';

class HospitalAccountEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      isDeleteDialogActive:false,
      isSaveDialogActive:false,
      hospitalName:'',
      hospitalId:0,
      hospitalCode:'',
      localityCode:'',
      displayName:'',
      mailAddress:'',
      password:'123456',
      hospitalUserId:0,
      hospitalUserPermissions:[],
      errorMessage:'',
      errorMessageHospitalName:'',
      errorMessageHospitalCode:'',
      errorMessageLocalityCode:'',
      errorMessageDisplayName:'',
      errorMessageMailAddress:'',
      errorMessagePassword:''
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      hospitalName:nextProps.accountInfo.hospitalName,
      hospitalId:nextProps.accountInfo.hospitalId,
      hospitalCode:nextProps.accountInfo.hospitalCode,
      localityCode:nextProps.accountInfo.localityCode,
      displayName:nextProps.accountInfo.displayName,
      mailAddress:nextProps.accountInfo.mailAddress,
      password: '123456',
      hospitalUserId: nextProps.accountInfo.hospitalUserId,
      hospitalUserPermissions:nextProps.accountInfo.hospitalUserPermissions
    });
  }

  handleChange = (name, event) => {
    this.setState({[name]: event.target.value});
    if(event.target.value !== '' && event.target.value !== null){
      switch(name) {
        case 'hospitalCode' :
          this.setState({errorMessageHospitalCode:''});
          break;
        case 'hospitalName' :
          this.setState({errorMessagerHospitalName:''});
          break;
        case 'localityCode' :
          this.setState({errorMessageLocalityCode:''});
          break;
        case 'displayName' :
          this.setState({errorMessageDisplayName:''});
          break;
        case 'password' :
          this.setState({errorMessagePassword:''});
          break;
        case 'mailAddress':
          if(!this.state.mailAddress.match(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/i)){
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
    if(this.state.hospitalCode === '' || this.state.hospitalCode === null){
      this.setState({errorMessageHospitalCode:'医療機関コード は空です'});
      isHasError = true;
    }else{
      this.setState({errorMessageHospitalCode:''});
    }
    if(this.state.hospitalName === '' || this.state.hospitalName === null){
      this.setState({errorMessagerHospitalName:'医療機関名 は空です'});
      isHasError = true;
    }else{
      this.setState({errorMessagerHospitalName:''});
    }
    if(this.state.localityCode === '' || this.state.localityCode === null){
      this.setState({errorMessageLocalityCode:'管轄自治体コード は空です'});
      isHasError = true;
    }else{
      this.setState({errorMessageLocalityCode:''});
    }
    if(this.state.displayName === '' || this.state.displayName === null){
      this.setState({errorMessageDisplayName:'アカウント名 は空です'});
      isHasError = true;
    }else{
      this.setState({errorMessageDisplayName:''});
    }
    if(this.state.mailAddress === '' || this.state.mailAddress === null){
      this.setState({errorMessageMailAddress:'ログインID は空です'});
      isHasError = true;
    }else{
      if(!this.state.mailAddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
        this.setState({errorMessageMailAddress:'電子メールでなければなりません'});
        isHasError= true;
      }else{
        this.setState({errorMessageMailAddress:''});
      }
    }
    if(this.state.password === '' || this.state.password === null){
      this.setState({errorMessagePassword:'パスワード は空です'});
      isHasError = true;
    }else{
      this.setState({errorMessagePassword:''});
    }
    return isHasError;
  }

  handleCheckboxChange = (id) => {
    this.state.hospitalUserPermissions.map((item) => {
        if (item.hospitalPermissionId === id) {
            item.isChecked= !item.isChecked
        }
    });
    this.setState({hospitalUserPermissions: this.state.hospitalUserPermissions.slice(0)});
  }

  handleDeleteConfirmation = (isActive) => {
    this.changeErrorMessage('');
    this.setState({isDeleteDialogActive:isActive});
  }

  handleDeleteConfirmationYes = () => {
    Api.deleteRequest(`/api/hospitalAccount?hospitalUserId=${this.state.hospitalUserId}`)
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
     if(this.handleCheckTextValue()){
      return false;
    }
    this.setState({isSaveDialogActive:isActive});
  }

  handleSaveConfirmationYes = () => {
    const hospitalPermissionIds = [];
    this.state.hospitalUserPermissions.map(item => {
      if (item.isChecked) {
        hospitalPermissionIds.push(item.hospitalPermissionId);
      }
    });
    if (this.props.isEditMode) {
      Api.putRequest(
        '/api/hospitalAccount', 
        {
          hospitalId: this.state.hospitalId,
          hospitalCode: this.state.hospitalCode,
          hospitalName: this.state.hospitalName,
          localityCode: this.state.localityCode,
          displayName: this.state.displayName,
          mailAddress: this.state.mailAddress,
          password: this.state.password,
          hospitalUserId: this.state.hospitalUserId,
          hospitalPermissionIds: hospitalPermissionIds
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
    } else {
      Api.postRequest(
        '/api/hospitalAccount', 
        {
          hospitalCode: this.state.hospitalCode,
          hospitalName: this.state.hospitalName,
          localityCode: this.state.localityCode,
          displayName: this.state.displayName,
          mailAddress: this.state.mailAddress,
          password: this.state.password,
          hospitalPermissionIds: hospitalPermissionIds
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

  changeErrorMessage = (message) => {
    this.setState({errorMessage: message});
  }

  handleCancel = () => {
    this.changeErrorMessage('');
    this.setState({
      errorMessageHospitalCode:'',
      errorMessagerHospitalName:'',
      errorMessageLocalityCode:'',
      errorMessageDisplayName:'',
      errorMessageMailAddress:'',
      errorMessagePassword:''
    });
    this.props.hideDialog();
  }

  render ()  {
    return (
        <Dialog theme={theme} active={this.props.isActive}>
            <div className={HospitalCss.errorMessage}>{this.state.errorMessage}</div>
            <table className={HospitalCss.htable} align="center">
              <tbody>
                <tr>
                  <td>■ 医療機関ID</td>
                  <td>{this.props.isEditMode ? this.state.hospitalId : ''}</td>    
                </tr>
                <tr>
                  <td>■ 医療機関コード</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.hospitalCode} onChange={this.handleChange.bind(this, 'hospitalCode')} /><br/>
                      <span className={HospitalCss.errorMessage}>{this.state.errorMessageHospitalCode}</span>
                  </td> 
                </tr>
                <tr>
                  <td>■ 医療機関名</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.hospitalName} onChange={this.handleChange.bind(this, 'hospitalName')} /><br/>
                      <span className={HospitalCss.errorMessage}>{this.state.errorMessagerHospitalName}</span>
                  </td>    
                </tr>
                <tr>
                  <td>■ 管轄自治体コード</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.localityCode} onChange={this.handleChange.bind(this, 'localityCode')} /><br/>
                      <span className={HospitalCss.errorMessage}>{this.state.errorMessageLocalityCode}</span>
                  </td>    
                </tr>
                <tr>
                  <td>■ アカウント名</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.displayName} onChange={this.handleChange.bind(this,'displayName')}/><br/>
                      <span className={HospitalCss.errorMessage}>{this.state.errorMessageDisplayName}</span>
                  </td>    
                </tr>
                <tr>
                  <td>■ ログインID</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.mailAddress} onChange={this.handleChange.bind(this,'mailAddress')}/><br/>
                      <span className={HospitalCss.errorMessage}>{this.state.errorMessageMailAddress}</span>
                  </td>    
                </tr>
                <tr>
                  <td>■ パスワード</td>
                  <td><input type="password" className={HospitalCss.text} value={this.state.password} onChange={this.handleChange.bind(this,'password')}/><br/>
                      <span className={HospitalCss.errorMessage}>{this.state.errorMessagePassword}</span>
                  </td>
                </tr>
                <tr>
                  <td>■ 権限</td>
                  <td>
                      {
                          this.state.hospitalUserPermissions.map((item,idx) => {
                              return (
                              <div key={idx}>
                                  <input type='checkbox' 
                                      checked={item.isChecked}
                                      onChange={this.handleCheckboxChange.bind(this, item.hospitalPermissionId)}/>
                                  {item.description}<br />
                             </div>)
                          })
                      }
                  </td>     
                </tr>
                <tr>
                  <td>
                     {
                      this.props.isEditMode 
                        ? <input type="button" value="削除" id="deleteId" onClick={this.handleDeleteConfirmation.bind(this, true)}/> 
                        : ''
                      }
                  </td>
                  <td>
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

export default HospitalAccountEditor;