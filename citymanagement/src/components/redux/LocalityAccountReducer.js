import * as Constants from '../../common/Constants';
import * as Api from '../../common/ApiCaller';
let initState ={
	localityAccountList :
	{
		totalCount:0,
		data:[],
		localityPermissionIds:[]
	},
	 status:Constants.EMPTY_STRING
}
 const localityReducers =(state=initState,action) => {
 	switch(action.type){
	 case 'fetchLocalityAccounts':
	    return {...state,localityAccountList:Object.assign({},action.data)};
	 
	 case 'postLocalityAccounts':
	    return {...state,status:Object.assign({},action.data)};
	 
	 case 'putLocalityAccounts':
	    return {...state,status:Object.assign({},action.data)};		
	  case 'delLocalityAccounts':
	  return {...state,status:Object.assign({},action.data)};		

	 default:
	 return state;   
 	}
 }
 export default localityReducers