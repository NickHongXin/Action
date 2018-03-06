import React, { Component } from 'react';
import HospitalCss from '../../css/edit.css';
import Dialog from 'react-toolbox/lib/dialog';
import theme from '../../css/dialog.css';
import DeleteConfirmation from './DeleteConfirmation';
import SaveConfirmation from './SaveConfirmation';

class LocalityAccountEditor extends Component {
	constructor(props){
	   	super(props);
	    this.state={
      		isDeleteDialogActive:false,
      		isSaveDialogActive:false,
		    cityName:'',
		    cityId:'',
		    cityCode:'',
		    managerId:'',
		    accountName:'',
		    passWord:'',
		    permissions:[
		    	{id:'1',name:'readyonly',isChecked:true},
		    	{id:'2',name:'all',isChecked:true},
		    ]
	    }
	}

	componentWillReceiveProps = (nextProps) =>{
		this.setState({
			cityName:nextProps.CityInfo.cityName,
			cityId:nextProps.CityInfo.cityId,
			cityCode:nextProps.CityInfo.cityCode,
			managerId:nextProps.CityInfo.managerId,
		})
	}

	handleChangeText = () =>{
		this.setState({
			accountName:this.refs.accountNameText.value,
			passWord:this.refs.passWordText.value,
		})
	}

	handleChange = (name, event) => {
		this.setState({[name]: event.target.value})
	}

	handleCheckbox = (id) => {
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

  	render(){ 		
    	return (
	        <Dialog theme={theme} active={this.props.isActive} onOverlayClick={this.props.hideDialog} onEscKeyDown={this.props.hideDialog}>
	            <table className={HospitalCss.htable} align="center">
	              <tbody>
	                <tr>
	                    <td>■ 自治体ID</td>
	                    <td>
	                    	{
	                    	this.props.isEditMode
							 ? this.state.cityId
	                    	 : 1111111
	                    	}     
	                    </td>    
	                </tr>
	                <tr>
	                    <td>■ 自治体コード</td>
	                    <td><input type="text" className={HospitalCss.text} value={this.state.cityCode} onChange={this.handleChange.bind(this, 'cityCode')} /></td> 
	                </tr>
	                <tr>
	                    <td>■ 自治体名</td>
	                    <td><input type="text" className={HospitalCss.text} value={this.state.cityName} onChange={this.handleChange.bind(this, 'cityName')} /></td>    
	                </tr>
	                <tr>
	                    <td>■ アカウント名</td>
	                    <td><input type="text" className={HospitalCss.text} ref="accountNameText" value={this.state.accountName} onChange={this.handleChangeText} /></td>
	                </tr>
	                <tr>
	                    <td>■ ログインID</td>
	                    <td><input type="text" className={HospitalCss.text} value={this.state.managerId} onChange={this.handleChange.bind(this, 'managerId')} /></td>    
	                </tr>
	                <tr>
	                    <td>■ パスワード</td>
	                    <td><input type="text" className={HospitalCss.text} ref="passWordText" value={this.state.passWord}  onChange={this.handleChangeText}/></td>
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
	                    					onChange={this.handleCheckbox.bind(this, item.id)}/>
	                    				{item.name}<br/>
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
								 ? <input type="button" value="削除" onClick={this.handleDeleteConfirmation.bind(this, true)}/>
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

export default LocalityAccountEditor;