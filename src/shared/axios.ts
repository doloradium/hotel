import axios, { AxiosError, CreateAxiosDefaults } from 'axios';

import { UserService } from '../services';

export const BASE_URL = import.meta.env.VITE_BASE_API_URL;

const common: CreateAxiosDefaults = {
    baseURL: BASE_URL,
};

export const S_PUBLIC_AXIOS = axios.create({
    ...common,
});

export const S_PRIVATE_AXIOS = axios.create({
    ...common,
});

let refreshTokenPromise: Promise<any> | null = null;

const redirectToLogin = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    
    if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        localStorage.setItem('redirectPath', window.location.pathname);
    }
    
    window.location.href = '/login';
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("accessToken");
};

S_PRIVATE_AXIOS.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    },
    (error) => Promise.reject(error)
);

S_PRIVATE_AXIOS.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error instanceof AxiosError) {
            const originalRequest = error.config as any;

            if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
                originalRequest._retry = true;

                if (!refreshTokenPromise) {
                    refreshTokenPromise = UserService.refresh();
                }

                try {
                    const newAccessToken = await refreshTokenPromise;
                    const token = newAccessToken?.data?.access_token;

                    if (token) {
                        localStorage.setItem("accessToken", token);
                        S_PRIVATE_AXIOS.defaults.headers.common.Authorization = `Bearer ${token}`;
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return S_PRIVATE_AXIOS(originalRequest);
                    } else {
                        redirectToLogin();
                        return Promise.reject(new Error('Authentication failed'));
                    }
                } catch (refreshError) {
                    redirectToLogin();
                    return Promise.reject(refreshError);
                } finally {
                    refreshTokenPromise = null;
                }
            }
        }
        return Promise.reject(error);
    }
);
