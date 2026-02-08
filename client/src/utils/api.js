import axios from 'axios';

// Get base URL and ensure it ends with /api
let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
if (!apiUrl.endsWith('/api')) {
    // Remove trailing slash if present then append /api
    apiUrl = apiUrl.replace(/\/$/, '') + '/api';
}
const API_URL = apiUrl;

// Create axios instance with base config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
