import { post } from './api';

// Определяем интерфейсы для данных авторизации
interface RegistrationData {
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface FacebookLoginData {
  access_token: string;
}

export const authAPI = {
  registration(registrationData: RegistrationData) {
    return post('auth/registration', registrationData);
  },
 
  login(loginData: LoginData) {
    return post('auth/login', loginData);
  },

  loginFacebook(accessToken: string) {
    return post('auth/facebook-login', { access_token: accessToken } as FacebookLoginData);
  },
};
