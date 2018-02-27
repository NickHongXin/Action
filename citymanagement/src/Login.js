import React, { Component } from 'react';
import Logo from './components/medical_engine/Logo';
import { Button } from 'react-toolbox/lib/button';

import theme from './css/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      zip11: ''
    };
  }

  handleChange = (name, e) => {
    this.setState({
      [name]: e.target.value
    });
  }

  handleSubmit = () => {
    // var formdata = new FormData();
    // formdata.set('username', this.state.username);
    // formdata.set('password', this.state.password);

    // axios({
    //    method: 'post',
    //    url: apiList.loginApi,
    //    data: formdata,
    //    config
    //  })
    //  .then((response) => {
    //    console.log(response);
    this.props.history.push('/index/ReservationStatus');
  //  })
  //  .catch((err) => {
  //    console.log(err);
  //  });
  }

  handlePostAuto = () => {
    // AjaxZip3.zip2addr(e.target, '', 'addr11', 'addr11');
  }

  handleAsyncSubmit = () => {
    sessionStorage.setItem('userName', this.state.username);
    this.props.history.push('/index/ReservationStatus');
  }

  generateUserInfo = () => {
    return {
      UserName: this.state.username,
      Password: this.state.password,
    };
  }

  render() {
    return (
      <section className={ theme.wrap } style={ { background: '#0aa985' } }>
        <div className={ theme.conts }>
          <h1 className={ theme.logo }><Logo /></h1>
          <ul className={ theme.input }>
            <li>
              <input placeholder='ユーザー名' type='text' name='username' value={ this.state.username } onChange={ this.handleChange.bind(this, 'username') } maxLength={ 16 } />
            </li>
            <li>
              <input placeholder='パスワード' type='password' name='password' value={ this.state.password } onChange={ this.handleChange.bind(this, 'password') } />
            </li>
          </ul>
          <div className={ theme.btn }>
            <Button label='ログイン' className={ theme.loginBt } onClick={ this.handleAsyncSubmit.bind(this) } />
          </div>
        </div>
      </section>
    );
  }
}

export default Login;