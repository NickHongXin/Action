let initState = {
	isDisabled: false,
	userInfoArray:[]
}

const userReducers = (state=initState, action) => {
	switch(action.type){
		case 'DISABLE_BUTTON':
			return {...state, isDisabled: action.isDisabled};
		case 'SHOW_USERINFO':
			return {...state, userInfoArray: action.data};
		default:
			return state;
	}
}

export default userReducers