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
      errorMessage:''
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      hospitalName:nextProps.accountInfo.hospitalName,
      hospitalId:nextProps.accountInfo.hospitalId,
      hospitalCode:nextProps.accountInfo.hospitalCode,
      localityCode:nextProps.accountInfo.localityCode,
      displayName:nextProps.accountInfo.displayName,
      mailAddress:nextProps.accountInfo.loginUserId,
      password: '123456',
      hospitalUserId: nextProps.accountInfo.hospitalUserId,
      hospitalUserPermissions:nextProps.accountInfo.hospitalUserPermissions
    });
  }

  handleChange = (name, event) => {
    this.setState({[name]: event.target.value});
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
                  <td><input type="text" className={HospitalCss.text} value={this.state.hospitalCode} onChange={this.handleChange.bind(this, 'hospitalCode')} /></td> 
                </tr>
                <tr>
                  <td>■ 医療機関名</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.hospitalName} onChange={this.handleChange.bind(this, 'hospitalName')} /></td>    
                </tr>
                <tr>
                  <td>■ 管轄自治体コード</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.localityCode} onChange={this.handleChange.bind(this, 'localityCode')} /></td>    
                </tr>
                <tr>
                  <td>■ アカウント名</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.displayName} onChange={this.handleChange.bind(this,'displayName')}/></td>    
                </tr>
                <tr>
                  <td>■ ログインID</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.mailAddress} onChange={this.handleChange.bind(this,'mailAddress')}/></td>    
                </tr>
                <tr>
                  <td>■ パスワード</td>
                  <td><input type="password" className={HospitalCss.text} value={this.state.password} onChange={this.handleChange.bind(this,'password')}/></td>
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