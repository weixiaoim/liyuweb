
import * as types from './actionTypes.js'
import axios from 'axios';
import { message } from 'antd';

const getLoginRequestAction = ()=>{
	return{
		type:types.LOGIN_REQUEST
	}
}
const getLoginDoneAction = ()=>{
	return{
		type:types.LOGIN_DONE
	}
}


export const getLoginAction = (values)=>{
	return (dispatch)=>{
		dispatch(getLoginRequestAction());

		axios({
			method:'post',
			url:'http://127.0.0.1:3000/admin/login',
			data:values
		})
		.then(result=>{
			// console.log(result);
			if (result.data.code == 0) {//登陆成功
				//跳转到后台首页
				window.location.href = "/"
			}else if(result.data.code == 1){
				message.error(result.data.message)
			}
		})
		.catch(err=>{
			console.log(err);
			message.error('网络请求失败，请稍后再试')
		})
		.finally(()=>{
			dispatch(getLoginDoneAction())
		})
	}
}


