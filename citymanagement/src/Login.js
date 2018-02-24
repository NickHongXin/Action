import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button';
import LoginMain from './css/LoginMain.css';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={LoginMain.background}>
        <div className={LoginMain.Main} align="center">
          <div className={LoginMain.JiiMo}>JiiMo</div>
          <div> <input type="text" className={LoginMain.user} placeholder="ユーザー名"/> </div>
          <div> <input type="text" className={LoginMain.psw} placeholder="パスワード"/> </div>
          <div>
            <button  onClick={ () => {this.props.history.push('/index')} } className={LoginMain.button} >
                ログイン
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;