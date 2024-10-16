import axios from 'axios';

import config from '../config';

const { backURL } = config;

const authHeader = (json:string|boolean = false) => {
  const contentType:string = json
    ? 'application/json'
    : 'application/x-www-form-urlencoded';
  const headers:any = { 'content-type': contentType };

  const userJSON:string|null = localStorage.getItem('user');
  let user;

  if (userJSON) {
    user = JSON.parse(userJSON);
  }

  // const user = 

  if (user?.token) {
    headers['x-solt'] = user.token;
  }

  return headers;
};

const addInterceptors = (instance:any, json:boolean = false) => {
  instance.interceptors.request.use((config:any) => {
    if (!config.headers['x-solt']) {
      config.headers = authHeader(json);
    }
    return config;
  }, Promise.reject);
};

const axiosInstance = axios.create({
  // async: true,
  // crossDomain: true,
  baseURL: backURL,
  headers: authHeader(true),
});

addInterceptors(axiosInstance, true);

const axiosFileInstance = axios.create({
  // async: true,
  // crossDomain: true,
  baseURL: backURL,
  headers: authHeader(),
  // processData: false,
  // contentType: false,
  // mimeType: 'multipart/form-data',
});

addInterceptors(axiosFileInstance);

const post = async (url: string, data: any, callback: (response: any) => void = () => {}, errorCallback: (error: any) => void = () => {}) => {
  try {
    const response:any = await axiosInstance.post(url, JSON.stringify(data));
    if (response) {
      callback?.(response);
      return response.data;
    }
    throw('Server error');
  } catch (error) {
    errorCallback?.(error);
    throw(error);
  }
};

const put = async (url: string, data: any, callback: () => void = () => {}, errorCallback: () => void = () => {}) => {
  const response:any = await axiosInstance
    .put(url, JSON.stringify(data))
    .then(callback)
    .catch(errorCallback);
  return response.data;
};

const deleteById = async (url: string, id: number) => {
  const response = await axiosInstance.delete(`${url}/${id}`);

  return (response.data);
};

const deleteAll = async (url: string) => {
  const response = await axiosInstance.delete(url);

  return (response.data);
};

// const deleteById = async (url, ...args) => {
//   let index = typeof args[0] === 'function' ? -1 : 0;
//   console.log('keep calm and test here =>',...args);
//   const id = args[index++];
//   const callback = args[index++];
//   const errorCallback = args[index];
//   console.log('keep calm and test here =>',id);
//   const response = await axiosInstance
//     .delete(`${url}/${id}`)
//     .then(callback)
//     .catch(errorCallback);
//   return response.data;
// };

// const get = async (url, callback, errorCallback) => {
//   const response = await axiosInstance
//     .get(url)
//     .then(callback)
//     .catch(errorCallback);
//   return response.data;
// };
const get = async (url:string, ...args: any[]) => {
  let index = typeof args[0] === 'function' ? -1 : 0;

  let data = args[index++];
  const callback = args[index++];
  const errorCallback = args[index];

  if (typeof data === 'object') {
    data = new URLSearchParams(data).toString();
    url = `${url}?${data}`;
  }

  const response = await axiosInstance
    .get(url)
    .then(callback)
    .catch(errorCallback);
  return response.data;
};

const postFile = (url: string, data: any, callback: () => void = () => {}, errorCallback: () => void = () => {}) => {
  return axiosFileInstance.post(url, data).then(callback).catch(errorCallback);
};

const putFile = (url: string, data: any, callback: () => void = () => {}, errorCallback: () => void = () => {}) => {
  return axiosFileInstance.put(url, data).then(callback).catch(errorCallback);
};

export { post, put, get, deleteById, deleteAll, postFile, putFile };
