import axios from 'axios';

export const apiService = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// 註冊、登入、登出
export const userLogin = (credentials) => apiService.post('/login', credentials);
export const userSignup = (credentials) => apiService.post('/signup', credentials);
export const userLogout = (credentials) => apiService.delete('/logout', credentials);

// Navbar
export const userAvatar = (formData) => apiService.post('/api/v1/auth/upload_avatar', formData);

// Dashboard
export const userUpdateName = (id, obj) => apiService.patch(`/api/v1/auth/users/${id}`, obj);
export const userRegArtist = (id, obj) => apiService.put(`/api/v1/auth/users/${id}`, obj);
export const newAuc = (formData) => apiService.post('/api/v1/auth/auctions', formData);

// 拍賣
export const fetchPriceRange = () => apiService.get('/api/v1/auctions/price_range');
export const fetchGenreList = () => apiService.get('/api/v1/genres');
export const fetchArtistList = () => apiService.get('/api/v1/artists');
export const fetchAuction = (slug) => apiService.get(`/api/v1/auctions/${slug}`);

// 首頁
export const fetchAuctions = () => apiService.get('/api/v1/auctions');
export const fetchHeroAuction = () => apiService.get('/api/v1/auctions/latest');

// 拍賣 卡片 component
export const fetchBidDetail = (slug) => apiService.get(`/api/v1/auth/auctions/${slug}/bid_detail`);
export const createBid = (obj) => apiService.post('/api/v1/auth/bid_details', { bid_details: obj });

// 藝術家
export const fetchArtists = () => apiService.get('/api/v1/artists_info');
