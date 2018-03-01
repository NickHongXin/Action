import React,{ Component } from 'react';
import theme from '../../css/dialogDel.css';
import Dialog from 'react-toolbox/lib/dialog';

class SaveConfirmation extends Component{
  constructor(props){
    super(props);
  }

  render () {
    return (
      <Dialog theme={theme} active={this.props.isActive} >
        <div className={theme.delMsg}>
           このデータを登録します。<br/>
            よろしいですか？
        </div>
        <div className={theme.buttonDiv}>
          <button className={theme.buttonYes} onClick={this.props.handleDialogYes}>はい</button>
          <button className={theme.buttonNo} onClick={this.props.handleDialogNo}>いいえ</button>
        </div>
      </Dialog>
    );
  }
}

export default SaveConfirmation;