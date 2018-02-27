import React,{ Component } from 'react';
import theme from '../../css/dialogDel.css';
import Dialog from 'react-toolbox/lib/dialog';


class ConfirmCom extends Component{
	constructor(props){
	    super(props);
	    this.state={
	      isDialogActive:false
	    }
	 }

	hideOrShowDialog = () => {
		this.setState({isDialogActive:!this.state.isDialogActive})
	}

	hide = () => {
		this.props.hideDialog();
	}
	hideConfim = () => {
		this.props.hideDialog();
	}

	render () {
    return (
        <Dialog theme={theme} active={this.props.isActive} onOverlayClick={this.props.hideDialog} onEscKeyDown={this.props.hideDialog}>
            <div className={theme.delMsg}>
            	このデータを登録します。<br/>
				よろしいですか？
			</div>
			<div className={theme.buttonDiv}>
				<button className={theme.buttonYes} onClick={this.hideConfim}>はい</button>
				<button className={theme.buttonNo} onClick={this.hide}>いいえ</button>
			</div>
        </Dialog>
    );
  }
}

export default ConfirmCom;