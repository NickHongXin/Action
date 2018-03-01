import React, { Component } from 'react';
import HospitalCss from '../../css/accountEditor.css';
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
      orgName:'',
      orgId:'',
      orgCode:'',
      cityCode:'',
      accountName:'',
      loginId:'',
      pwd:'',
      permissions:[
        {id:'1',name:'readyonly',isChecked:true},
        {id:'2',name:'all',isChecked:true},
      ]
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      orgName:nextProps.accountInfo.orgName,
      orgId:nextProps.accountInfo.orgId,
      orgCode:nextProps.accountInfo.orgCode,
      cityCode:nextProps.accountInfo.cityCode
    })
  }

  handleChange = (name, event) => {
    this.setState({[name]: event.target.value})
  }

  handleCheckboxChange = (id) => {
      this.state.permissions.map((item)=>{
          if (item.id === id) {
              item.isChecked= !item.isChecked
          }
      })
    this.setState({permissions: this.state.permissions.slice(0)})
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
                  <td>{this.state.orgId}</td>    
                </tr>
                <tr>
                  <td>■ 医療機関コード</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.orgCode} onChange={this.handleChange.bind(this, 'orgCode')} /></td> 
                </tr>
                <tr>
                  <td>■ 医療機関名</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.orgName} onChange={this.handleChange.bind(this, 'orgName')} /></td>    
                </tr>
                <tr>
                  <td>■ 管轄自治体コード</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.cityCode} onChange={this.handleChange.bind(this, 'cityCode')} /></td>    
                </tr>
                <tr>
                  <td>■ アカウント名</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.accountName} onChange={this.handleChange.bind(this,'accountName')}/></td>    
                </tr>
                <tr>
                  <td>■ ログインID</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.loginId} onChange={this.handleChange.bind(this,'loginId')}/></td>    
                </tr>
                <tr>
                  <td>■ パスワード</td>
                  <td><input type="text" className={HospitalCss.text} value={this.state.pwd} onChange={this.handleChange.bind(this,'pwd')}/></td>
                </tr>
                <tr>
                  <td>■ 権限</td>
                  <td>
                      {
                          this.state.permissions.map((item,idx) => {
                              return (
                              <div key={idx}>
                                  <input type='checkbox' 
                                      checked={item.isChecked}
                                      onChange={this.handleCheckboxChange.bind(this, item.id)}/>
                                  {item.name}<br />
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