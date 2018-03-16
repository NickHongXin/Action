import * as Constants from '../../common/Constants';
import * as Api from '../../common/ApiCaller';

export const FETCHHOSPITALACCOUNTS = 'fetchHospitalAccounts';

export function fetchHospitalAccounts (data) {
	return {
		type : FETCHHOSPITALACCOUNTS,
		data
	}
}

export function getHospitalAcoount (item) {
	return dispatch => {
		Api.getRequest(Constants.HOSPITAL_ACCOUNT_API_PATH, item)
			.then(res => dispatch(fetchHospitalAccounts(res.data)))
			.catch(err => console.log(err))
	}	
}