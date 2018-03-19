import * as Constants from '../../common/Constants';
import * as Api from '../../common/ApiCaller';

export const FETCHLOCALITYACCOUNTS = 'fetchLocalityAccounts';

export const POSTADDLOCALITYUSER = 'postAddLocalityUser';

export const PUTUPDATELOCALITYUSER = 'putUpdateLocalityUser';

export const DELETELOCALITYUSER = 'deletedLocalityUser';

export function fetchLocalityAccounts (data) {
	return {
		type : FETCHLOCALITYACCOUNTS,
		data
	}
}

export function getLocalityAccount (item) {
	return dispatch => {
		Api.getRequest(Constants.LOCALITY_ACCOUNT_API_PATH, item)
			.then((res) => {dispatch(fetchLocalityAccounts(res.data));Api.setToken(res.headers.authorization)})
			.catch(err => console.log(err))
	}
}

export function postAddLocalityUser (data) {
	return {
		type : POSTADDLOCALITYUSER,
		data
	}
}

export function addLocalityUser (item) {
	return dispatch => {
		Api.postRequest(Constants.LOCALITY_ACCOUNT_API_PATH,item)
			.then((res) => {dispatch(postAddLocalityUser(res.data));Api.setToken(res.headers.authorization)})
			.catch(err => console.log(err)) 
	}
}

export function putUpdateLocalityUser (data) {
	return {
		type :PUTUPDATELOCALITYUSER,
		data
	}
}

export function updateLocalityUser (item) {
	return dispatch => {
		Api.putRequest(Constants.LOCALITY_ACCOUNT_API_PATH, item)
			.then((res) => {dispatch(putUpdateLocalityUser(res.data));Api.setToken(res.headers.authorization)})
			.catch(err => console.log(err))
	}
}

export function deletedLocalityUser (data) {
	return {
		type :DELETELOCALITYUSER,
		data
	}
}

export function deleteLocalityUser (item) {
	return dispatch => {
		Api.deleteRequest(Constants.LOCALITY_ACCOUNT_API_PATH,item)
			.then((res) => {dispatch(deletedLocalityUser(res.data));Api.setToken(res.headers.authorization)})
			.catch(err => console.log(err))
	}
}

