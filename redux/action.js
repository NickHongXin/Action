export const userInfoAction = (id) => ({
	type:'USER_INFO',
	id
})

export const userConfirmAction = (data) => ({
	type:'USER_CONFIRM',
	data
})

export const disableSaveButton = () => ({
	type:'DISABLE_BUTTON'
})