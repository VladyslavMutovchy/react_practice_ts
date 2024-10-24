import config from '../config';

export const getFieldFromURLParams = (field) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(field);
};

export const getFieldFromURLHash = (field) => {
  const hash = window.location.hash.substring(1); 
  const params = new URLSearchParams(hash);
  return params.get(field);
};

export const getUserData = () => {
  const userDataJSON = localStorage.getItem('user');

  if (userDataJSON) {
    const userData = JSON.parse(userDataJSON);
    return userData;
  }

  return null;
};

export const setUserData = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};


export const updateUserData = (userData) => {
  const oldUserData = getUserData();
  const newUserData = {
    ...oldUserData,
    ...userData,
  };
  setUserData(newUserData);
};

export const backendFileURL = (path) => {
  if (path && path.indexOf('http') !== 0) {
    return `${config.backFileURL}${path}`;
  }

  return path;
};
export function convertDateTime(input) {
  const date = new Date(input);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} - ${hours}:${minutes}`;
}