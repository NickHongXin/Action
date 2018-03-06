import React, { Component } from 'react';
import Logo from './components/account_management/Logo';
import { Button } from 'react-toolbox/lib/button';
import theme from './css/login.css';
import * as Api from './common/ApiCaller';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mailAddress: '',
      password: ''
    };
  }

  handleChange = (name, e) => {
    this.setState({
      [name]: e.target.value
    });
  }

  handleSubmit = () => {
    Api.postRequest(
        '/api/account', 
        {
          mailAddress: this.state.mailAddress,
          password: this.state.password
        })
      .then((res) => {
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('userMail', this.state.mailAddress);
        sessionStorage.setItem('userName', res.data.displayName);
        this.props.history.push('/index');})
      .catch((error) => {
        // todo show error message
        console.log(error.response)
    });
  }

  render() {
    return (
      <section className={ theme.wrap } style={ { background: '#0aa985' } }>
        <div className={ theme.conts }>
          <h1 className={ theme.logo }><Logo /></h1>
          <ul className={ theme.input }>
            <li>
              <input placeholder='ユーザー名' type='text' name='mailAddress' value={ this.state.mailAddress } onChange={ this.handleChange.bind(this, 'mailAddress') } />
            </li>
            <li>
              <input placeholder='パスワード' type='password' name='password' value={ this.state.password } onChange={ this.handleChange.bind(this, 'password') } />
            </li>
          </ul>
          <div className={ theme.btn }>
            <Button label='ログイン' className={ theme.loginBt } onClick={ this.handleSubmit.bind(this) } />
          </div>
        </div>
      </section>
    );
  }
}

export default Login;