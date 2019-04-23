

import React,{ Component } from 'react'
import axios from 'axios'
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';

import './index.css'

class NormalLoginForm extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
			console.log('Received values of form: ', values);
				axios({
					method:'post',
					url:'http://127.0.0.1:3000/admin/login',
					date:values
				})
				.then(result=>{
					console.log(result);
				})
				.catch(err=>{
					console.log(err);
				})
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="Login">
				<Form className="login-form">
				<Form.Item>
				  {getFieldDecorator('userName', {
				    rules: [{ required: true, message: '请输入用户名!' },{pattern: /^[a-z0-9_]{3,6}$/,message: '用户名为3到6位的字母，数字或者下划线'}],
				  })(
				    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
				  )}
				</Form.Item>
				<Form.Item>
				  {getFieldDecorator('password', {
				    rules: [{ required: true, message: '请输入密码!' },{pattern: /^\w{3,6}$/,message: '密码为3到6位的字符'}],
				  })(
				    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
				  )}
				</Form.Item>
				<Form.Item>
				  <Button type="primary" onClick={this.handleSubmit} className="login-form-button">
				    登陆
				  </Button>
				</Form.Item>
				</Form>
			</div>
		);
	}
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;