const API_BASE_URL = 'http://localhost:8000'
import { user } from '../store/store.js';

async function request(method, url, data) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const token = localStorage.getItem('token');
  
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  const headersObj = Object.fromEntries(headers.entries());

  const requestOptions = {
    method: method,
    headers: headers,
    body: JSON.stringify(data),
  };

  const response = await fetch(API_BASE_URL + url, requestOptions);

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json();
    throw errorData;
  }
}

export async function signUp(email, password) {
  try {
    const response = await request('POST', '/api/auth/signUp', { email, password });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function login(email, password) {
  try {
    const response = await request('POST', '/api/auth/login', { email, password });
    return response;
  } catch (error) {
    throw error;
  }
}

export function setToken(token) {
    localStorage.setItem('token', token.replace('Bearer ', ''));
}

export function getToken() {
  return localStorage.getItem('token');
}

export function removeToken() {
  localStorage.removeItem('token');
}

export async function getUser() {
    try {
      const token = getToken();
  
      if (!token) {
        return null;
      }

      const response = await fetch(API_BASE_URL + '/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('getUser:', response); 
  
      if (response.ok) {
        const userData = await response.json();
        user.set(userData);
        return userData;
      } else {
        removeToken();
        user.set(null);
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  export async function getUserEmail() {
    try {
      const userData = await getUser();
      return userData ? userData.email : '';
    } catch (error) {
      console.error('Error getting user email', error.message);
      return '';
    }
  }
  