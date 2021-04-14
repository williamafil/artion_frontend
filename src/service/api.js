import axios from 'axios';

export const apiService = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// AXIOS 攔截器
apiService.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('axios interceptors response');
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('axios interceptors 錯誤');
    if (error.response.status === 401) {
      this.$store.dispatch('logout');
    }

    return Promise.reject(error);
  }
);

export const userLogin = (credentials) => apiService.post('/login', credentials);
export const userSignup = (credentials) => apiService.post('/signup', credentials);
export const userLogout = (credentials) => apiService.delete('/logout', credentials);
