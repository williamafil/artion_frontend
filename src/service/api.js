import axios from 'axios';

export const apiService = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const userLogin = (credentials) => apiService.post('/login', credentials);
export const userSignup = (credentials) => apiService.post('/signup', credentials);
export const userLogout = (credentials) => apiService.delete('/logout', credentials);
