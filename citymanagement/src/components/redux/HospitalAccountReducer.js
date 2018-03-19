import * as Constants from '../../common/Constants';
import * as Api from '../../common/ApiCaller';

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
        case 'postHospitalUser':
            return {...state, status:Object.assign({}, action.data)};
         case 'putHospitalUser':
            return {...state, status:Object.assign({}, action.data)};
        case 'delHospitalUser':
            return {...state, status:Object.assign({}, action.data)};
        default:
            return state;
    }
}

export default hospitalReducers