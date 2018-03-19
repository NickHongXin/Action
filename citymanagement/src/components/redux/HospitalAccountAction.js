import * as Constants from '../../common/Constants';
import * as Api from '../../common/ApiCaller';

export const FETCHHOSPITALACCOUNTS ='fetchHospitalAccounts';
export function fetchHospitalAccounts(data){
	return{
		type:FETCHHOSPITALACCOUNTS,
		data
	}
}

export function getHospitalAcoount(item){
	return dispatch =>{

		Api.getRequest(Constants.HOSPITAL_ACCOUNT_API_PATH, item)
		.then(res =>dispatch(fetchHospitalAccounts(res.data)))
		.catch(err => console.log(err))
	}
}
  


 export const POSTHOSPITALUSER ='postHospitalUser';
 
 export function postHospitalUser(data) {
 	return{
 		type:POSTHOSPITALUSER,
 		data
 	}
 }

 export function addHospitalUser(item) {
 	return dispatch => {
 		Api.postRequest(Constants.HOSPITAL_ACCOUNT_API_PATH,item)
 		.then(res =>dispatch(postHospitalUser(res.data)))
		.catch(err => console.log(err))
 	}
 }

 export const  PUTHOSPITSLUSER='putHospitalUser';

 export function putHospitalUser(data){
 	return{
 		type:PUTHOSPITSLUSER,
 		data
 	}
 }
 export function updateHospitalUser(item){
 	return dispatch =>{
 		Api.putRequest(Constants.HOSPITAL_ACCOUNT_API_PATH,item)
 		.then(res =>dispatch(putHospitalUser(res.data)))
 		.catch(err => console.log(err))
 	}
 }


export const DELHOSPITSLUSER='delHospitalUser';

export function delHospitalUser(data){
	return {
		type:DELHOSPITSLUSER,
		data
	}
}

export function deleteHospitalUser(item){

	return dispatch =>{
		Api.deleteRequest(Constants.HOSPITAL_ACCOUNT_API_PATH,item)
		.then(res =>dispatch(delHospitalUser(res.data)))
 		.catch(err => console.log(err))
	}
}