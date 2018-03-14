function GetLoginUserName() {
	return sessionStorage.getItem('userName');
}

export default GetLoginUserName;
