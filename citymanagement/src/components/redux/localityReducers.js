import * as Constants from '../../common/Constants';
import * as Api from '../../common/ApiCaller';
// import actionTypes from './hospitalActions';


let initState = {
	localityAccountList:{
		totalCount:0,
		data:[],
		localityUserPermissions:[]
	},
	status:Constants.EMPTY_STRING
}

const localityReducers = (state = initState, action) => {
	
	switch(action.type){
		case 'fetchLocalityAccounts':
			return {...state, localityAccountList:Object.assign({}, action.data)};
		case 'postAddLocalityUser':
			return {...state, status:Object.assign({}, action.data)};
		case 'putUpdateLocalityUser':
			return {...state, status:Object.assign({}, action.data)};
		case 'deletedLocalityUser':
			return {...state, status:Object.assign({}, action.data)};
		default:
			return state;
	}
}

export default localityReducers