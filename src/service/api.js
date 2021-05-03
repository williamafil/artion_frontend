import axios from 'axios';

export const apiService = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://artion.balliiballii.com',
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
export const userData = (userId) => apiService.get(`/api/v1/auth/users/${userId}/user_data`);
export const follows = (userId) => apiService.get(`/api/v1/auth/users/${userId}`);
export const aucs = (userId) => apiService.get(`/api/v1/auth/users/${userId}/artist_auctions`);
export const fetchOrders = (userId) => apiService.get(`/api/v1/auth/users/${userId}/orders`);

// 拍賣
export const fetchPriceRange = () => apiService.get('/api/v1/auctions/price_range');
export const fetchGenreList = () => apiService.get('/api/v1/genres');
export const fetchArtistList = () => apiService.get('/api/v1/artists');
export const fetchAuction = (slug) => apiService.get(`/api/v1/auctions/${slug}`);

// 首頁
export const recentAuctions = () => apiService.get('/api/v1/auctions/recent');
export const fetchAuctions = () => apiService.get('/api/v1/auctions');
export const fetchHeroAuction = () => apiService.get('/api/v1/auctions/latest');
export const fetchProgress = () => apiService.get('/api/v1/auctions/in_progress');

// 拍賣 卡片 component
export const fetchBidDetail = (slug) => apiService.get(`/api/v1/auth/auctions/${slug}/bid_detail`);
export const createBid = (obj) => apiService.post('/api/v1/auth/bid_details', { bid_details: obj });

// 藝術家
export const fetchArtists = () => apiService.get('/api/v1/artists_info');
export const fetchArtistInfo = (nameId) => apiService.get(`api/v1/artist_infos/${nameId}`);

// 關注
export const like = (uid, aid) => apiService.get(`/api/v1/auth/likes/state?uid=${uid}&aid=${aid}`);
export const createLike = (paramsObj) => apiService.post('/api/v1/auth/likes', { like: paramsObj });
export const removeLike = (likeId) => apiService.delete(`/api/v1/auth/likes/${likeId}`);
