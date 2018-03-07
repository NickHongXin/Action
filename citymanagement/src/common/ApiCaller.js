import axios from 'axios';
import getConfig from '../config/Config';

const config = getConfig();

const instance = axios.create({
  baseURL: config.baseURL,
  headers: {
    'Content-Type': 'application/json',
    'ClientId': 3
  }
});

const setHeaders = (token) => {
  instance.defaults.headers.common['Authorization'] = `Token ${token}`;
};

export const getToken = () => {
  return sessionStorage.getItem('token');
};

export const setToken = (token) => {
  return sessionStorage.setItem('token', token.split(' ')[1]);
};

export const getRequest = (path, params) => {
  setHeaders(getToken());
  return instance.get(path, {
    params: params
  });
};

export const deleteRequest = (path, params) => {
  setHeaders(getToken());
  return instance.delete(path, {
    params: params
  });
};

export const postRequest = (path, data) => {
  setHeaders(getToken());
  return instance.post(path, data);
};

export const putRequest = (path, data) => {
  setHeaders(getToken());
  return instance.put(path, data);
};

export const patchRequest = (path, data) => {
  setHeaders(getToken());
  return instance.patch(path, data);
};

export const login = (path, data) => {
  return instance.post(path, data);
};