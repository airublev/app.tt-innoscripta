import axios from "axios";

import AuthService from "./auth";

export const API_URL = 'http://tt-innoscripta-test.local/';

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

let csrfToken = null;
let csrfTokenLoading = false;

(async () => {
    if (!csrfToken) {
        if (csrfTokenLoading) {
            return new Promise((resolve) => {
                const intervalId = setInterval(() => {
                    if (csrfToken) {
                        clearInterval(intervalId);
                        resolve(csrfToken);
                    }
                }, 100);
            });
        }

        try {
            csrfTokenLoading = true;
            const response = await apiClient.get('/');
            csrfToken = response.data.csrf_token;

            apiClient.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
            csrfTokenLoading = false;
        } catch (error) {
            console.error('Error updating CSRF token:', error);
            csrfTokenLoading = false;
        }
    }
})();

apiClient.interceptors.request.use((config) => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser && currentUser.access_token) {
        config.headers.Authorization = `Bearer ${currentUser.access_token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;