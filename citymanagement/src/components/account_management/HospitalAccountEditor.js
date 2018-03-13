import React, { Component } from 'react';
import EditCss from '../../css/edit.css';
import Dialog from 'react-toolbox/lib/dialog';
import DeleteConfirmation from './DeleteConfirmation';
import SaveConfirmation from './SaveConfirmation';
import theme from '../../css/dialog.css';
import * as Api from '../../common/ApiCaller';
import * as Constants from '../../common/Constants';
import Logout from '../function/Logout';
import {withRouter} from 'react-router-dom';
import * as Validations from '../function/Validate';

class HospitalAccountEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteDialogActive: false,
      isSaveDialogActive: false,
      hospitalName: Constants.EMPTY_STRING,
      hospitalId: 0,
      hospitalCode: Constants.EMPTY_STRING,
      localityCode: Constants.EMPTY_STRING,
      displayName: Constants.EMPTY_STRING,
      mailAddress: Constants.EMPTY_STRING,
      password: Constants.EMPTY_STRING,
      hospitalUserId: 0,
      hospitalUserPermissions: []
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState(Object.assign({}, nextProps.accountInfo));
  }

  handleChange = (name, event) => {
    this.changeErrorMessage(Constants.EMPTY_STRING);
    Validations.clearError.bind(this, name)();
    this.setState({[name]: event.target.value});
  }

  handleCheckboxChange = (id) => {
    this.state.hospitalUserPermissions.map((item) => {
        if (item.hospitalPermissionId === id) {
            item.isChecked = !item.isChecked
        }
    });
    this.setState({hospitalUserPermissions: this.state.hospitalUserPermissions.slice(0)});
  }

  handleDeleteConfirmation = (isActive) => {
    this.changeErrorMessage(Constants.EMPTY_STRING);
    this.setState({isDeleteDialogActive:isActive});
  }

  handleDeleteConfirmationYes = () => {
    Api.deleteRequest(Constants.HOSPITAL_ACCOUNT_API_PATH,
        {
          hospitalUserId: this.state.hospitalUserId
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
    this.setState({isSaveDialogActive:isActive});
  }

  handleSaveConfirmationYes = () => {
    const hospitalPermissionIds = [];
    this.state.hospitalUserPermissions.map(item => {
      if (item.isChecked) {
        hospitalPermissionIds.push(item.hospitalPermissionId);
      }
    });
    this.props.isEditMode ? 
      Api.putRequest(
        Constants.HOSPITAL_ACCOUNT_API_PATH, 
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
        .then(res => this.handleSaveSuccess(res))
        .catch(err => this.handleSaveError(err))
    : Api.postRequest(
        Constants.HOSPITAL_ACCOUNT_API_PATH, 
        {
          hospitalCode: this.state.hospitalCode,
          hospitalName: this.state.hospitalName,
          localityCode: this.state.localityCode,
          displayName: this.state.displayName,
          mailAddress: this.state.mailAddress,
          password: this.state.password,
          hospitalPermissionIds: hospitalPermissionIds
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
    return Validations.isEmpty.bind(this, 'hospitalCode', this.state.hospitalCode)()
      | Validations.isEmpty.bind(this, 'hospitalName', this.state.hospitalName)()
      | Validations.isEmpty.bind(this, 'localityCode', this.state.localityCode)()
      | Validations.isEmpty.bind(this, 'displayName', this.state.displayName)()
      | Validations.isEmpty.bind(this, 'mailAddress', this.state.mailAddress)()
      | Validations.isEmpty.bind(this, 'password', this.state.password)() ? true : false;
  }

  render ()  {
    return (
        <Dialog theme={theme} active={this.props.isActive}>
            <div className={EditCss.errorMessage}>{this.state.apiError}</div>
            <table className={EditCss.htable} align="center">
              <tbody>
                <tr>
                  <td>■ 医療機関ID</td>
                  <td>{this.props.isEditMode ? this.state.hospitalId : Constants.EMPTY_STRING}</td>    
                </tr>
                <tr>
                  <td>■ 医療機関コード</td>
                  <td>
                    <input type="text" className={EditCss.text} value={this.state.hospitalCode} onChange={this.handleChange.bind(this, 'hospitalCode')} />
                    <br /><span className={EditCss.errorMessage}>{this.state.hospitalCodeError}</span>
                  </td> 
                </tr>
                <tr>
                  <td>■ 医療機関名</td>
                  <td>
                    <input type="text" className={EditCss.text} value={this.state.hospitalName} onChange={this.handleChange.bind(this, 'hospitalName')} />
                    <br /><span className={EditCss.errorMessage}>{this.state.hospitalNameError}</span>
                  </td>
                </tr>
                <tr>
                  <td>■ 管轄自治体コード</td>
                  <td>
                    <input type="text" className={EditCss.text} value={this.state.localityCode} onChange={this.handleChange.bind(this, 'localityCode')} />
                    <br /><span className={EditCss.errorMessage}>{this.state.localityCodeError}</span>
                  </td>
                </tr>
                <tr>
                  <td>■ アカウント名</td>
                  <td>
                    <input type="text" className={EditCss.text} value={this.state.displayName} onChange={this.handleChange.bind(this,'displayName')}/>
                    <br /><span className={EditCss.errorMessage}>{this.state.displayNameError}</span>
                  </td>
                </tr>
                <tr>
                  <td>■ ログインID</td>
                  <td>
                    <input type="text" className={EditCss.text} value={this.state.mailAddress} onChange={this.handleChange.bind(this,'mailAddress')}/>
                    <br /><span className={EditCss.errorMessage}>{this.state.mailAddressError}</span>
                  </td>
                </tr>
                <tr>
                  <td>■ パスワード</td>
                  <td>
                    <input type="text" className={EditCss.text} value={this.state.password} onChange={this.handleChange.bind(this,'password')}/>
                    <br /><span className={EditCss.errorMessage}>{this.state.passwordError}</span>
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
                        : Constants.EMPTY_STRING
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

export default withRouter(HospitalAccountEditor);