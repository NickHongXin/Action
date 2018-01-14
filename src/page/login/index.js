import React, {Component} from 'react'
import { Form, Input, Button, notification, Icon } from 'antd';
import './index.less'
import {connect} from 'react-redux'

const FormItem = Form.Item;
class LoginPage extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        let n = this.props.form.getFieldsValue().username;
        let p = this.props.form.getFieldsValue().password;
        this.props.handleLogin(n, p)
        if (this.props.isLogin) {
        	this.props.history.push('/list')
        }
    }

    componentDidMount() {

    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className="loginpagewrap">
                <div className="box">
                    <p>Welcome to the ReactSPA</p>
                    <div className="loginWrap">
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入用户名' }],
                                })(
                                    <Input placeholder="Username" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码' }],
                                })(
                                    <Input type="password" placeholder="Password" />
                                )}
                            </FormItem>
                            <Button type="primary" htmlType="submit" className="loginBtn">Login</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    isLogin: state.isLogin,
    username: state.username
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleLogin: (username, pwd) => dispatch(
    	{ 
    		type: 'LOGIN', 
    		username: username, 
            pwd: pwd 
    	})
  }
}

let Login = Form.create()(LoginPage);
export default connect(mapStateToProps, mapDispatchToProps)(Login);