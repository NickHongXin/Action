import React, { Component } from 'react';
import HospitalCss from '../../css/AccountEditor.css';
import Dialog from 'react-toolbox/lib/dialog';
import theme from '../../css/dialog.css';
import DeleteCom from './DeleteCom';
import ConfirmCom from './ConfirmCom';

class CityAccountEditorNew extends Component {
  constructor(props){
    super(props);
    this.state={
      isDialogActive:false,
      isConfimActive:false
    }
  }

  hideOrShowDialogDel = () => {
     this.setState({isDialogActive:!this.state.isDialogActive})
  }
  hideOrShowDialogCon = () => {
     this.setState({isConfimActive:!this.state.isConfimActive})
  }

  hide = () => {
    this.props.hideDialog();
  }
  render(){
  		
    	return (
	        <Dialog theme={theme} active={this.props.isActive} onOverlayClick={this.props.hideDialog} onEscKeyDown={this.props.hideDialog}>
	            <table className={HospitalCss.htable} align="center">
	              <tbody>
	                <tr>
	                    <td>■ 自治体ID</td>
	                    <td></td>    
	                </tr>
	                <tr>
	                    <td>■ 自治体コード</td>
	                    <td><input type="text"  /></td> 
	                </tr>
	                <tr>
	                    <td>■ 自治体名</td>
	                    <td><input type="text" /></td>    
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
	                        
	                    </td>
	                    <td >
	                        <input type="button" value="完了" onClick={() => this.hideOrShowDialogCon(true)}/>
	                        <input type="button" value="キャンセル" onClick={this.props.hideDialog} />
	                    </td>
	                </tr>
	              </tbody>
	            </table>
	            <DeleteCom isActive={this.state.isDialogActive} hideDialog={this.hideOrShowDialogDel} />
            	<ConfirmCom isActive={this.state.isConfimActive} hideDialog={this.hideOrShowDialogCon} />
	        </Dialog>
    );
  }
}

export default CityAccountEditorNew;