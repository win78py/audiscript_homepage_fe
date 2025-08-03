"use client";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { API_URL } from '../configs';
import { LoginData } from '../types/auth';
import { axiosApi, axiosPost } from '../utils/axios/api';

// type LoginResponse = {};
console.log("API_URL:", API_URL);
const authServices = {
    
  login: async (params: LoginData) => {
    try {
      const res = await axios.post(`${API_URL}auth/login`, params);
      return res?.data;
    } catch (error: any) {
      if (error?.response?.data?.data === 'customer is blocked') {
        return { success: false, error: 'customer_blocked' };
      }
      return false;
    }
  },
  logout: async (token: string) => {
    const config: AxiosRequestConfig<any> = {
      method: 'POST',
      url: '/auth/logout',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    try {
      // const res = await axios.post(`${API_URL}/auth/logout`);
      // return res?.data;
      const response: AxiosResponse = await axiosApi(config);
      return response?.data;
    } catch (error) {
      return false;
    }
  },
  getNewAccessToken: async () => {
    try {
      const response = await axiosPost('/auth/access-token');
      return response;
    } catch (error) {
      return false;
    }
  },
  update: async (params: any) => {
    try {
      const res = await axiosPost(`/user/change_info`, params);
      return res;
    } catch (error) {
      return false;
    }
  },
  checkRefreshToken: async (headers: any) => {
    try {
      const res = await axios.get(`${API_URL}/auth/checkRefreshToken`, { headers: headers });
      return res?.data;
    } catch (error) {
      return false;
    }
  },
  refreshToken: async (params: any) => {
    try {
      const res = await axios.post(`${API_URL}/auth/refresh-token`, params);
      return res?.data;
    } catch (error) {
      return false;
    }
  },
  getAppConfig: async (params: any) => {
    try {
      const res = await axios.get(`${API_URL}/config`, params);
      return res?.data;
    } catch (error) {
      return false;
    }
  },
  loginWithKakao: async (params: { code?: string; access_token?: string; d1: boolean; d2: boolean; d3: boolean }) => {
    try {
      const res = await axios.post(`${API_URL}/auth/kakao/login`, { ...params });
      console.log('return api:', res?.data);
      return res?.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  loginWithNaver: async (code: string) => {
    try {
      const res = await axios.post(`${API_URL}/auth/naver/login`, { code });
      return res?.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  consentItems: async (params: any, token: string) => {
    try {
      const res = await axios.post(`${API_URL}/customer/consent-items`, params, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res?.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  getIDByNamePhone: async (name: string, phone: string, id?: string) => {
    try {
      const res = await axios.get(`${API_URL}/customer/query`, { params: { name, phone, id } });
      return res?.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  changePassword: async (name: string, phone: string, id: string, newPassword: string) => {
    try {
      const res = await axios.post(`${API_URL}/customer/change-pw`, { name, phone, id, newPassword });
      return res?.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
};

export default authServices;
