import React,{ Component } from 'react';
import theme from '../../css/dialogDel.css';
import Dialog from 'react-toolbox/lib/dialog';


class HospitalDeleteConfirm extends Component{
    constructor(props){
        super(props);
        this.state={
         
        }
     }

   
    hide = () => {
        this.props.hideDialog();
    }

    render () {
   return (
       <Dialog theme={theme} active={this.props.isActive} >
           <div className={theme.delMsg}>
               このデータを削除ボタンします。<br/>
                よろしいですか？
            </div>
            <div className={theme.buttonDiv}>
                <button className={theme.buttonYes}>はい</button>
                <button className={theme.buttonNo} onClick={() =>this.hide()}>いいえ</button>
            </div>
       </Dialog>
   );
 }
}

export default HospitalDeleteConfirm;