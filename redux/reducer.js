
let initState = {
	uname: '',
	isDisabled: false
}

const userReducers = (state=initState, action) => {
	switch(action.type){
		case 'USER_INFO':
			return {...state, uname: action.id};
		case 'USER_CONFIRM':
			return state;
		case 'DISABLE_BUTTON':
			return {...state, isDisabled: state.isDisabled ? false : true};
		default:
			return state;
	}
}

export default userReducers