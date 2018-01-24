import * as api from '../src/api'

export const disableSaveButton = (isDisabled) => ({
	type:'DISABLE_BUTTON',
	isDisabled
})

export const showUserInfo = (data) => {
	return {
	type:'SHOW_USERINFO',
	data
}}

export const addUser = (userInfo, history) => {
	return dispatch => {
		dispatch(disableSaveButton(true));
		api.postConfirmUser({}, userInfo)
		.then(res => { 
			dispatch(fetchUserInfo());
			history.push('/show');
		})
		.catch(error => console.log(error));
	}
}

export const fetchUserInfo = () => {
	return dispatch => {
		api
		.getUserInfo()
		.then(res => dispatch(showUserInfo(res.data)))
		.catch(error => console.log(error))
	}
}