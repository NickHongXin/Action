import React, { Component } from 'react';
import HospitalCss from '../../css/AccountEditor.css';
import Dialog from 'react-toolbox/lib/dialog';
import HospitalDeleteComfirm from './HospitalDeleteConfirm';
import HospitalComfirm from './HospitalDeleteConfirm';
import theme from '../../css/dialog.css';

class HospitalAccountEditor extends Component {
  constructor(props){
    super(props);
    this.state={
      isDialogActive:false,
      orgName:'',
      orgId:'',
      orgCode:'',
      managerId:'',
      cityCode:''
    }
  }

  hide = () => {
    this.props.hideDialog();
    
  }
  hideOrShowDialog = () =>{
     this.setState({isDialogActive:!this.state.isDialogActive})
  }

  componentWillReceiveProps = (nextProps) =>{
    this.setState({
      orgName:nextProps.accountInfo.orgName,
      orgId:nextProps.accountInfo.orgId,
      orgCode:nextProps.accountInfo.orgCode,
      managerId:nextProps.accountInfo.managerId,
      cityCode:nextProps.accountInfo.cityCode
    })
  }

  handleChange = (name, event) => {
    this.setState({[name]: event.target.value})
  }

  render ()  {
    return (
        <Dialog theme={theme} active={this.props.isActive} onOverlayClick={this.props.hideDialog} onEscKeyDown={this.props.hideDialog}>
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
                  <td><input type="text"/></td>    
                </tr>
                <tr>
                  <td>■ ログインID</td>
                  <td><input type="text"/></td>    
                </tr>
                <tr>
                  <td>■ パスワード</td>
                  <td><input type="text"/></td>    
                </tr>
                <tr>
                  <td>■ 権限</td>
                  <td>
                      <input type="checkbox" value="1"/>1<br/>
                      <input type="checkbox" value="2"/>2<br/>
                      <input type="checkbox" value="3"/>3
                  </td>    
                </tr>
                <tr></tr>
                <tr>
                  <td>
                  
                     <input type="button" value="削除" id="deleteId" onClick={() => this.hideOrShowDialog()}/> 
                  </td>
                  <td >
                      <input type="button" value="完了" onClick={() => this.hideOrShowDialog(true)} />
                      <input type="button" value="キャンセル" onClick={this.hide} />
                  </td>
                </tr>
              </tbody>
            </table>  
            <HospitalDeleteComfirm  isActive={this.state.isDialogActive} hideDialog={this.hideOrShowDialog} />
        
        </Dialog>
    );
  }
}

export default HospitalAccountEditor;