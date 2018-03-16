import * as Constants from '../../common/Constants';
import * as Api from '../../common/ApiCaller';
import actionTypes from './action';


let initState = {
	hospitalAccountList :{
		totalCount:0,
		data:[],
		hospitalPermissions:[]
	},
	status:Constants.EMPTY_STRING
}

const hospitalReducers = (state = initState, action) => {
	
	switch(action.type){
		case 'fetchHospitalAccounts':
			return {...state, hospitalAccountList:Object.assign({}, action.data)};
		case 'addHospitalUser':
			return {...state, status:Object.assign({}, action.data)};
		case 'updateHospitalUser':
			return {...state, status:Object.assign({}, action.data)};
		case 'deleteHospitalUser':
			return {...state, status:Object.assign({}, action.data)};
		default:
			return state;
	}
}

export default hospitalReducers