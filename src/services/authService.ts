import axios, { AxiosError } from "axios";
import { api } from "./apiService";
import { IUser } from "../interfaces";
import { apiRequests } from "./requestService";
import { StorageKeyEnum } from "../enums";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (token: string) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};

const refreshToken = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const data = await refreshToken();
                    isRefreshing = false;
                    onTokenRefreshed(data.accessToken);
                } catch (refreshError) {
                    isRefreshing = false;
                    return Promise.reject(refreshError);
                }
            }

            return new Promise((resolve) => {
                refreshSubscribers.push((token) => {
                    if (error.config) {
                        error.config.headers.Authorization = `Bearer ${token}`;
                        resolve(api(error.config));
                    }
                });
            });
        }
        return Promise.reject(error);
    }
);

const STORAGE = localStorage;

export const storeUserData = (authUser: IUser) => {
    STORAGE.setItem(StorageKeyEnum.AUTH_USER, JSON.stringify(authUser));
};

export const getAuthUser = async (): Promise<IUser | null> => {
    const authUserData = STORAGE.getItem(StorageKeyEnum.AUTH_USER);
    let authUser: IUser | null = authUserData ? JSON.parse(authUserData) : null;
    return authUser;
};

export const logout = async () => {
    apiRequests.logout();
    removeAuth();
};

const removeAuth = async (): Promise<void> => {
    const authUser = await getAuthUser();
    if (authUser) {
        STORAGE.removeItem(StorageKeyEnum.AUTH_USER);
    }
};