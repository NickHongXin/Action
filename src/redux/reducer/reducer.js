let initSate = {
	username: '',
	isLogin: false,
	currenttab: ''
}

const reducer = (state=initSate, action) => {
	console.log("initSate: "+ action.type+" "+state.isLogin+" "+state.username)
	switch (action.type) {
	    case 'LOGIN':
	      if (action.username === '123' && action.pwd === '123'){
	      	console.log("CurrentSate: "+ action.type+" "+state.isLogin+" "+state.username)
	      	return { ...state, isLogin: true, username: action.username}
	      }
	    case 'TAB_SWITCH':
				return { ...state, currenttab: action.tabkey || action.specialkey}
	    default:
	      return state
    }
}

export default reducer