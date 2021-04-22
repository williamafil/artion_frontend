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
export const userAvatar = (formData) => apiService.post('/api/v1/auth/upload_avatar', formData);
export const userUpdateName = (id, obj) => apiService.patch(`/api/v1/auth/users/${id}`, obj);

export const fetchAuctions = () => apiService.get('/api/v1/auctions');
export const fetchAuction = (slug) => apiService.get(`/api/v1/auctions/${slug}`);
export const fetchBidDetail = (slug) => apiService.get(`/api/v1/auth/auctions/${slug}/bid_detail`);
export const createBid = (obj) => apiService.post('/api/v1/auth/bid_details', { bid_details: obj });
export const userRegArtist = (id, obj) => apiService.put(`/api/v1/auth/users/${id}`, obj);
