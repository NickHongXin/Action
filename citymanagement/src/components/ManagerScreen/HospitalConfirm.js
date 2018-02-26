import React,{ Component } from 'react';
import theme from '../../css/dialogDel.css';
import Dialog from 'react-toolbox/lib/dialog';


class HospitalConfirm extends Component{
    constructor(props){
        super(props);
        
     }

   
    hide = () => {
        this.props.hideDialog();
    }

    render () {
   return (
       <Dialog theme={theme} active={this.props.isActive} >
           <div className={theme.delMsg}>
               このデータを登録します。<br/>
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

export default HospitalConfirm;