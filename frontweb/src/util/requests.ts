import qs from 'qs';
import axios from 'axios';

type LoginResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  userFirstName: string;
  userId: number;
};

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const token = "authData"

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';

type LoginData = {
  username: string;
  password: string;
};

export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: 'password',
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    data,
    headers,
  });
};

export const saveAuthData = (obj: LoginResponse) => {
    localStorage.setItem(token, JSON.stringify(obj));
}

export const getAuthData = () => {
    const str = localStorage.getItem(token) ?? "{}";
    return JSON.parse(str) as LoginResponse;
}
