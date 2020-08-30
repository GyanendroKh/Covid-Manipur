import axios from 'axios';

export const configureDefaultAxios = () => {
  axios.defaults.baseURL = 'http://192.168.29.106:9090';
};

export const randomColor = () => {
  return Number((Math.random() * 254 + 1).toFixed(0));
};
