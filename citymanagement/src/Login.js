import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button label='ログイン' onClick={ () => {this.props.history.push('/index')} } accent raised className='btn bubble' />
      </div>
    );
  }
}

export default Login;