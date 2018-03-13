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
      hospitalNameValid:'',
      hospitalIdValid:'',
      hospitalCodeValid:'',
      localityCodeValid:'',
      displayNameValid:'',
      mailAddressValid:'',
      passwordValid:'',

    }
  }
  handleClick()
  {
     let errorExit = false;
       if(this.state.hospitalCode === ""||this.state.hospitalCode === null)
       {
            this.setState
            ({
                hospitalCodeValid: "hospitalCode不能为空"
            })
           errorExit = true; 
       }else if(this.state. hospitalName === ""||this.state.hospitalName === null)
       {
            this.setState({
                hospitalCodeValid: "",
                hospitalNameValid: " hospitalName不能为空",
            })
             errorExit = true;
        }else if(this.state. localityCode === ""||this.state.localityCode === null)
       {
            this.setState({
                hospitalCodeValid: "",
                hospitalNameValid: "",
                localityCodeValid:"localityCode不能为空",
            })
             errorExit = true;
        }
        else if(this.state. displayName === ""||this.state.displayName === null)
       {
            this.setState({
                hospitalCodeValid: "",
                hospitalNameValid: "",
                localityCodeValid:"",
                displayNameValid:"displayName不能为空"
            })
             errorExit = true;
        }
      
        else if(this.state.mailAddress === ""||this.state.mailAddress === null)
       {
            this.setState({
                hospitalCodeValid: "",
                hospitalNameValid: "",
                localityCodeValid:" ",
                displayNameValid:" ",
                mailAddressValid:"mailAddress不能为空"
            })
             errorExit = true;
        }else if(this.state. password === ""||this.state.password === null)
       {
            this.setState({
                hospitalCodeValid: "",
                hospitalNameValid: "",
                localityCodeValid:" ",
                displayNameValid:" ",
                mailAddressValid:" ",
                passwordValid:"password 不能为空",
            })
             errorExit = true;
        }else
        {
            this.setState({ //清除help-block提示文字
                 hospitalCodeValid: "",
                 hospitalNameValid: "",
                 localityCodeValid:"",
                 displayNameValid:"",
                 mailAddressValid:"",
                 passwordValid:"",
            });
          }
          return errorExit;
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
    if(event.target.value !=''&&event.target.value !=null){
          if(name==='hospitalCode')
          {
            this.setState({ hospitalCodeValid: ""});
          }
          if(name==='hospitalName')
          {
            this.setState({ hospitalNameValid: ""});
          }
          if(name==='localityCode')
          {
             this.setState({ localityCodeValid: ""});
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
    if(this.handleClick())
    {
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
                <span>{this.state.hospitalCodeValid}</span>
                
                <tr>
                  <td>■ 医療機関名</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.hospitalName} onChange={this.handleChange.bind(this, 'hospitalName')} /></td>    
                </tr>
                <span>{this.state.hospitalNameValid}</span>
              
                <tr>
                  <td>■ 管轄自治体コード</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.localityCode} onChange={this.handleChange.bind(this, 'localityCode')} /></td>    
                </tr>
                 <span>{this.state.localityCodeValid}</span>


                <tr>
                  <td>■ アカウント名</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.displayName} onChange={this.handleChange.bind(this,'displayName')}/></td>    
                </tr>
                <span>{this.state.displayNameValid}</span>


                <tr>
                  <td>■ ログインID</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.mailAddress} onChange={this.handleChange.bind(this,'mailAddress')}/></td>    
                </tr>
                <span>{this.state.mailAddressValid}</span>

                <tr>
                  <td>■ パスワード</td>
                  <td><input type="password" className={HospitalCss.text} value={this.state.password} onChange={this.handleChange.bind(this,'password')}/></td>
                </tr>
               <span>{this.state.passwordValid}</span>


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