import * as Constants from '../../common/Constants';
import * as Api from '../../common/ApiCaller';

export const FETCHHOSPITALACCOUNTS = 'fetchHospitalAccounts';

export const POSTADDHOSPITALUSER = 'addHospitalUser';

export const PUTUPDATEHOSPITALUSER = 'updateHospitalUser';

export const DELETEHOSPITALUSER = 'deleteHospitalUser';

export function fetchHospitalAccounts (data) {
	return {
		type : FETCHHOSPITALACCOUNTS,
		data
	}
}

export function getHospitalAcoount (item) {
	return dispatch => {
		Api.getRequest(Constants.HOSPITAL_ACCOUNT_API_PATH, item)
			.then((res) => {dispatch(fetchHospitalAccounts(res.data));Api.setToken(res.headers.authorization)})
			.catch(err => console.log(err))
	}	
}

export function postHospitalUser(data) {
	return {
		type : POSTADDHOSPITALUSER,
		data
	}
}

export function addHospitalUser(item) {
	return dispatch => {
		Api.postRequest(Constants.HOSPITAL_ACCOUNT_API_PATH, item)
			.then((res) => {dispatch(postHospitalUser(res.data));Api.setToken(res.headers.authorization)})
			.catch(err => console.log(err))
	}
}

export function putHospitalUser(data) {
	return {
		type : PUTUPDATEHOSPITALUSER,
		data
	}
}

export function updateHospitalUser(item) {
	return dispatch => {
		Api.putRequest(Constants.HOSPITAL_ACCOUNT_API_PATH, item)
			.then((res) => {dispatch(putHospitalUser(res.data));Api.setToken(res.headers.authorization)})
			.catch(err => console.log(err))
	}
}

export function deleteHospitalUser(data) {
	return {
		type : DELETEHOSPITALUSER,
		data
	}
}

export function deletedHospitalUser(item) {
	return dispatch => {
		Api.deleteRequest(Constants.HOSPITAL_ACCOUNT_API_PATH,item)
			.then((res) => {dispatch(deleteHospitalUser(res.data));Api.setToken(res.headers.authorization)})
			.catch(err => console.log(err))
	}
}