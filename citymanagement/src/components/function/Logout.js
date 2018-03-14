function Logout() {
	sessionStorage.clear();
	this.props.history.push('/');
}

export default Logout;
