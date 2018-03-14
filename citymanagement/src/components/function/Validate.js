import * as Constants from '../../common/Constants'

export function isEmpty(field, value) {
	let isEmpty = !value || value.trim().length === 0 ? true : false;
	switch (field) {
		case 'hospitalCode':
			this.setState({hospitalCodeError: isEmpty ? '医療機関コードを入力してください。' : Constants.EMPTY_STRING});
			break;
		case 'hospitalName':
			this.setState({hospitalNameError: isEmpty ? '医療機関名を入力してください。' : Constants.EMPTY_STRING});
			break;
		case 'localityCode':
			this.setState({localityCodeError: isEmpty ? '自治体コードを入力してください。' : Constants.EMPTY_STRING});
			break;
		case 'localityName':
			this.setState({localityNameError: isEmpty ? '自治体名を入力してください。' : Constants.EMPTY_STRING});
			break;
		case 'displayName':
			this.setState({displayNameError: isEmpty ? 'アカウント名を入力してください。' : Constants.EMPTY_STRING});
			break;
		case 'mailAddress':
		case 'loginUserId':
			if (isEmpty) {
				this.setState({mailAddressError: 'ログインIDを入力してください。'});
			} else {
				let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
				isEmpty = !reg.test(value);
				this.setState({mailAddressError: isEmpty ? '正しいログインIDを入力してください。' : Constants.EMPTY_STRING});
			}
			break;
		case 'password':
			this.setState({passwordError: isEmpty ? 'パスワードを入力してください。' : Constants.EMPTY_STRING});
			break;
		default:
			break;
	}

	return isEmpty;
}


export function clearError(field) {
	switch(field) {
		case 'hospitalCode':
			this.setState({hospitalCodeError: Constants.EMPTY_STRING});
			break;
		case 'hospitalName':
			this.setState({hospitalNameError: Constants.EMPTY_STRING});
			break;
		case 'localityCode':
			this.setState({localityCodeError: Constants.EMPTY_STRING});
			break;
		case 'localityName':
			this.setState({localityNameError: Constants.EMPTY_STRING});
			break;
		case 'displayName':
			this.setState({displayNameError: Constants.EMPTY_STRING});
			break;
		case 'mailAddress':
		case 'loginUserId':
			this.setState({mailAddressError: Constants.EMPTY_STRING});
			break;
		case 'password':
			this.setState({passwordError: Constants.EMPTY_STRING});
			break;
		case 'all':
			this.setState(
				{
					hospitalCodeError: Constants.EMPTY_STRING,
					hospitalNameError: Constants.EMPTY_STRING,
					localityCodeError: Constants.EMPTY_STRING,
					localityNameError: Constants.EMPTY_STRING,
					displayNameError: Constants.EMPTY_STRING,
					mailAddressError: Constants.EMPTY_STRING,
					passwordError: Constants.EMPTY_STRING
				});
			break;
		default:
			break;
	}
}