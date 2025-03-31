import { IAuthRequest, IRestResponse, ISignupRequest, IToken } from "../interfaces";
import { api } from "./apiService";
import { AxiosError } from 'axios';

interface IErrorResponse {
  message: string;
}

async function get<T, U>(url: string, params: U, isAuth?: boolean): Promise<IRestResponse<T>> {
  try {
    const response = await api.get<IRestResponse<T>>(url, { params });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<IErrorResponse>;
    throw new Error(axiosError.response?.data?.message || 'An error occurred while fetching data');
  }
}

async function post<T, U>(url: string, data: U, isAuth?: boolean): Promise<IRestResponse<T>> {
  try {
    const response = await api.post<IRestResponse<T>>(url, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<IErrorResponse>;
    throw new Error(axiosError.response?.data?.message || 'An error occurred while posting data');
  }
}

export const apiRequests = {
  async login(data: IAuthRequest): Promise<IRestResponse<IToken>> {
    return post<IToken, IAuthRequest>("auth/login", data, false);
  },

  async signup(data: ISignupRequest): Promise<IRestResponse<IToken>> {
    return post<IToken, ISignupRequest>("auth/signup", data, false);
  },

  async logout(): Promise<IRestResponse<{}>> {
    return get("auth/logout", undefined, true);
  },

}