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
(error) => {
    return Promise.reject(error);
}
);

// Handle 401 (Unauthorized) errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token is invalid or expired
            localStorage.removeItem('token');
            // Redirect to home/login if not already there
            if (window.location.pathname !== '/') {
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
