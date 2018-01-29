const apiConfig = () => {
	switch (process.env.NODE_ENV){
		case 'dev':
			return {
				baseURL: 'http://dev',
				env:'dev'}
		case 'production':
			return {
				baseURL: 'http://product',
				env:'production'}
		default:
			return {
				baseURL: 'http://localhost:3000',
				env:'dev'}
	}
}

export default apiConfig