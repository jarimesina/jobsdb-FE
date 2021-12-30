import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:4001',
  timeout: 15000,
  headers: {'Content-Type': 'application/json',},
});

export const setToken = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getToken = () => {
  return instance.defaults.headers.common.Authorization?.replace(/^(Bearer)/, '');
};

export const setLang = (lang: string) => {
  instance.defaults.headers.common['x-language'] = lang;
};

export default instance;