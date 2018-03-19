import * as Constants from '../../common/Constants';
import * as Api from '../../common/ApiCaller';

export const FETCHLOCALITYACCOUNTS ='fetchLocalityAccounts';
export function fetchLocalityAccounts(data){
	return{
		type:FETCHLOCALITYACCOUNTS,
		data
	}
}
  
export function getLocalityAccount(item){
	return dispatch =>{
		Api.getRequest(Constants.LOCALITY_ACCOUNT_API_PATH,item)
		.then(res =>dispatch(fetchLocalityAccounts(res.data)))
		.catch(err =>console.log(err))
	}
}

export const POSTLOCALITYACCOUNTS='postLocalityAccounts';
export function postLocalityAccounts(data){
	return{
		type:POSTLOCALITYACCOUNTS,
		data
	}
}
  
export function addLocalityAccount(item){
	return dispatch =>{
		Api.postRequest(Constants.LOCALITY_ACCOUNT_API_PATH,item)
		.then(res =>dispatch(postLocalityAccounts(res.data)))
		.catch(err =>console.log(err))
	}
}


export const PUTLOCALITYACCOUNTS='putLocalityAccounts';
export function putLocalityAccounts(data){
	return{
		type:PUTLOCALITYACCOUNTS,
		data
	}
}
  
export function updateLocalityAccount(item){
	return dispatch =>{
		Api.putRequest(Constants.LOCALITY_ACCOUNT_API_PATH,item)
		.then(res =>dispatch(putLocalityAccounts(res.data)))
		.catch(err =>console.log(err))
	}
}


export const DELLOCALITYACCOUNTS='delLocalityAccounts';
export function delLocalityAccounts(data){
	return{
		type:DELLOCALITYACCOUNTS,
		data
	}
}
  
export function deleteLocalityAccount(item){
	return dispatch =>{
		Api.deleteRequest(Constants.LOCALITY_ACCOUNT_API_PATH,item)
		.then(res =>dispatch(delLocalityAccounts(res.data)))
		.catch(err =>console.log(err))
	}
}