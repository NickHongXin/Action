import axios from 'axios'
import apiCongfig from './config.js'
const config = apiCongfig()

const instance = axios.create({
  baseURL: config.baseURL
});

export const getUserInfo = (id) => {
	return instance.get('/user/info',{params:{Id:id}})
}

export const postConfirmUser = (params={}, data={}) => {
	return instance.post('/user/confirm',{
		params:params, 
		data:data, 
		headers:{'Content-Type':'application/json'}})
}