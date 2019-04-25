/*
* @Author: TomChen
* @Date:   2019-04-11 18:56:06
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:51:38
*/
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	isFetching:false
})

export default (state=defaultState,action)=>{
	if(action.type == types.LOGIN_REQUEST){
		return state.set('isFetching',true)
	}
	if(action.type == types.LOGIN_DONE){
		return state.set('isFetching',false)
	}

	return state;
}