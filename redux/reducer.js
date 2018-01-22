
let initState = {
	uname: ''
}

const userReducers = (state=initState, action) => {
	console.log(action.type)
	switch(action.type){
		case 'USER_INFO':
			return {...state, uname: action.id};
		case 'USER_CONFIRM':
			return state;
		default:
			return state;
	}
}

export default userReducers