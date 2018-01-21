import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

export const getUserInfo = (id) => {
	return instance.get('/user/info',{params:{Id:id}})
}

export const postConfirmUser = (params={}, data={}) => {
	console.log(data)
	return instance.post('/user/confirm',{
		params:params, 
		data:data, 
		headers:{'Content-Type':'application/json'}})
}