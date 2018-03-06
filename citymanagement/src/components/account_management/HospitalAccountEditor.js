import React, { Component } from 'react';
import HospitalCss from '../../css/edit.css';
import Dialog from 'react-toolbox/lib/dialog';
import DeleteConfirmation from './DeleteConfirmation';
import SaveConfirmation from './SaveConfirmation';
import theme from '../../css/dialog.css';

class HospitalAccountEditor extends Component {
  constructor(props){
    super(props);
    this.state={
      isDeleteDialogActive:false,
      isSaveDialogActive:false,
      hospitalName:'',
      hospitalId:'',
      hospitalCode:'',
      localityCode:'',
      displayName:'',
      mailAddress:'',
      password:'',
      hospitalUserPermissions:[]
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
      hospitalUserPermissions:nextProps.accountInfo.hospitalUserPermissions
    })
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
    this.setState({isDeleteDialogActive:isActive});
  }

  handleDeleteConfirmationYes = () =>{
    // todo delete from db  
    this.handleDeleteConfirmation(false);
    this.props.hideDialog(); 
  }

  handleSaveConfirmation = (isActive) => {
    this.setState({isSaveDialogActive:isActive});
  }

  handleSaveConfirmationYes = () =>{
    // todo save to db  
    this.handleSaveConfirmation(false);
    this.props.hideDialog(); 
  }

  render ()  {
    return (
        <Dialog theme={theme} active={this.props.isActive}>
            <table className={HospitalCss.htable} align="center">
              <tbody>
                <tr>
                  <td>■ 医療機関ID</td>
                  <td>{this.state.hospitalId}</td>    
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
                  <td><input type="text" className={HospitalCss.text} value={this.state.password} onChange={this.handleChange.bind(this,'password')}/></td>
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
                  <td >
                      <input type="button" value="完了" onClick={this.handleSaveConfirmation.bind(this, true)} />
                      <input type="button" value="キャンセル" onClick={this.props.hideDialog} />
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