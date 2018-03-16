import * as Constants from '../../common/Constants';
import * as Api from '../../common/ApiCaller';
import actionTypes from './action';


let initState = {
	hospitalAccountList :{
		totalCount:0,
		data:[{
			hospitalName:Constants.EMPTY_STRING,
			hospitalId:0,
			hospitalCode:Constants.EMPTY_STRING,
			mailAddress:Constants.EMPTY_STRING,
			localityCode:Constants.EMPTY_STRING,
			displayName:Constants.EMPTY_STRING,
			hospitalUserId:0,
			hospitalUserPermissions:{
				hospitalUserPermissionId:0,
				hospitalPermissionId:0
			}
		}],
		hospitalPermissions:[{
			hospitalPermissionId:0,
			description:Constants.EMPTY_STRING
		}]
	}
}

const hospitalReducers = (state = initState, action) => {
	
	switch(action.type){
		case 'fetchHospitalAccounts':
			return {...state, hospitalAccountList:Object.assign({}, action.data)};
		default:
			return state;
	}
}

export default hospitalReducers