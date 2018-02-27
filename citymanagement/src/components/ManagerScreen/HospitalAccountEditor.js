import React, { Component } from 'react';
import HospitalCss from '../../css/AccountEditor.css';
import Dialog from 'react-toolbox/lib/dialog';
import HospitalDeleteComfirm from './HospitalDeleteConfirm';
import HospitalConfirm from './HospitalConfirm';
import theme from '../../css/dialog.css';

class HospitalAccountEditor extends Component {
  constructor(props){
    super(props);
    this.state={
      isDialogDelActive:false,
      isDialogConfActive:false,
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

  handleCancel = () => {
    this.props.hideDialog();    
  }

  hideDelete = () => {
    this.setState({isDialogDelActive:true});
  }

  hideDeleteDialogYes = () =>{
    // todo delete from db  
    this.handleCancel();
    this.setState({isDialogDelActive:false});
  }

  hideDeleteDialogNo = () =>{
    this.setState({isDialogDelActive:false});
  }

  handleSave = () => {
    this.setState({isDialogConfActive:true});
  }

  handleSaveDialogYes = () =>{
    // todo save to db  
    this.handleCancel();
    this.setState({isDialogConfActive:false});
  }

  handleSaveDialogNo = () =>{
    // todo save to db  

    this.setState({isDialogConfActive:false});
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

  componentWillMount =() => {
    console.log('HospitalAccountEditor hitted')
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
                  <td><input type="text" value={this.state.orgCode} onChange={this.handleChange.bind(this, 'orgCode')} /></td> 
                </tr>
                <tr>
                  <td>■ 医療機関名</td>
                  <td><input type="text" value={this.state.orgName} onChange={this.handleChange.bind(this, 'orgName')} /></td>    
                </tr>
                <tr>
                  <td>■ 管轄自治体コード</td>
                  <td><input type="text" value={this.state.cityCode} onChange={this.handleChange.bind(this, 'cityCode')} /></td>    
                </tr>
                <tr>
                  <td>■ アカウント名</td>
                  <td><input type="text" value={this.state.accountName} onChange={this.handleChange.bind(this,'accountName')}/></td>    
                </tr>
                <tr>
                  <td>■ ログインID</td>
                  <td><input type="text" value={this.state.loginId} onChange={this.handleChange.bind(this,'loginId')}/></td>    
                </tr>
                <tr>
                  <td>■ パスワード</td>
                  <td><input type="text" value={this.state.pwd} onChange={this.handleChange.bind(this,'pwd')}/></td>    
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
                <tr></tr>
                <tr>
                  <td>
                     {
                      this.props.isEditMode 
                        ? <input type="button" value="削除" id="deleteId" onClick={() => this.hideDelete()}/> 
                        : ''
                      }
                  </td>
                  <td >
                      <input type="button" value="完了" onClick={() => this.handleSave()} />
                      <input type="button" value="キャンセル" onClick={() => this.handleCancel()} />
                  </td>
                </tr>
              </tbody>
            </table>  
            <HospitalDeleteComfirm  
              isActive={this.state.isDialogDelActive} 
              handleDeleteDialogYes={this.hideDeleteDialogYes}
              handleDeleteDialogNo={this.hideDeleteDialogNo} />
            <HospitalConfirm 
              isActive={this.state.isDialogConfActive}
              handleConfirmDialogYes={this.handleSaveDialogYes} 
              handleConfirmDialogNo={this.handleSaveDialogNo} />
        </Dialog>
    );
  }
}

export default HospitalAccountEditor;