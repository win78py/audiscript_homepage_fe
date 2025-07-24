import { API_URL } from '@/base/configs';
// import useUserActions from '@/base/hooks/useUserActions';
// import { authAtom } from '@/base/store/atoms/auth';
import { Modal } from 'antd';
import axios, { AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';
import { useRef } from 'react';

export const Headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};

export type CustomAxiosConfigType = Omit<AxiosRequestConfig, 'method' | 'url' | 'headers' | 'responseType' | 'data' | 'params'>;

export const axiosApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
    // session_id: '4xyzjswk'
    // 'X-Requested-With': 'XMLHttpRequest',
  },
  baseURL: API_URL

  // withCredentials: true
});

export const useAxiosInterceptors = () => {
//   const { logout, checkRefreshToken: refreshAccessToken, setNewAccessToken } = useUserActions();
//   const authData = useRecoilValue(authAtom);

//   const tokenRef = useRef<string | null>(authData?.customer?.accessToken || null);
//   const refreshTokenRef = useRef<string | null>(authData?.customer?.refreshToken || null);
  // const isRefreshing = useRef<boolean>(false);
  // const refreshSubscribers = useRef<((token: string) => void)[]>([]);
  const isModalVisibleRef = useRef<boolean>(false);

  // const router = useRouter();
//   useEffect(() => {
//     tokenRef.current = authData?.customer?.accessToken || null;
//     refreshTokenRef.current = authData?.customer?.refreshToken || null;
//   }, [authData]);

  // const onTokenRefreshed = (newToken: string): void => {
  //   refreshSubscribers.current.forEach((callback) => callback(newToken));
  //   refreshSubscribers.current = [];
  // };

  // const addRefreshSubscriber = (callback: (token: string) => void): void => {
  //   refreshSubscribers.current.push(callback);
  // };

  // * Đóng tạm vì không có auth
//   useEffect(() => {
//     const requestInterceptor = axiosApi.interceptors.request.use(
//       (config) => {
//         config.baseURL = API_URL;
//         if (tokenRef.current) {
//           config.headers.Authorization = `Bearer ${tokenRef.current}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     const responseInterceptor = axiosApi.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const originalRequest = error.config;
//         const errorStatus = error?.response?.status;
//         const errorData = error?.response?.data;

//         if (!errorStatus) return Promise.reject(error);
//         switch (errorStatus) {
//           case 404:
//             // navigate('/not-found');
//             break;

//           case 401:
//             if (errorData?.error === 'permission') {
//               showWarningModal('No permission', 'You do not have permission to access this resource');
//             } else {
//               if (refreshTokenRef.current) {
//                 if (!isRefreshing.current) {
//                   isRefreshing.current = true;
//                   try {
//                     const newToken = await refreshAccessToken(refreshTokenRef.current);
//                     tokenRef.current = newToken.data.token;
//                     setNewAccessToken(newToken.data.token);

//                     onTokenRefreshed(newToken);
//                     isRefreshing.current = false;

//                     // Retry original request
//                     originalRequest.headers.Authorization = `Bearer ${newToken.data.token}`;
//                     return axiosApi(originalRequest);
//                   } catch (refreshError) {
//                     isRefreshing.current = false;
//                     handleSessionExpired();
//                     return Promise.reject(refreshError);
//                   }
//                 }
//               }

//               return new Promise((resolve) => {
//                 addRefreshSubscriber((newToken: any) => {
//                   originalRequest.headers.Authorization = `Bearer ${newToken}`;
//                   resolve(axiosApi(originalRequest));
//                 });
//               });
//             }
//             break;

//           default:
//             break;
//         }

//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axiosApi.interceptors.request.eject(requestInterceptor);
//       axiosApi.interceptors.response.eject(responseInterceptor);
//     };
//   }, []);

  // const showWarningModal = (title: string, content: string) => {
  //   if (!isModalVisibleRef.current) {
  //     isModalVisibleRef.current = true;
  //     Modal.warning({
  //       styles: { content: { padding: 15 } },
  //       title,
  //       content,
  //       okText: 'Ok',
  //       centered: true,
  //       onOk: () => {
  //         isModalVisibleRef.current = false;
  //       },
  //       onCancel: () => {
  //         isModalVisibleRef.current = false;
  //       }
  //     });
  //   }
  // };
  
// Đóng tạm vì không có auth
  // Handle expired session
//   const handleSessionExpired = () => {
//     showWarningModal('Expired session', 'Your session has expired. Please log in again.');
//     logout(tokenRef.current || '');
//   };
};
export async function axiosAPI<T>(
  endPoint: string,
  method: string,
  payload = {},
  headers = {},
  responseType = 'json',
  // customConfig: CustomAxiosConfigType = {}
) {
  const config: AxiosRequestConfig<any> = {
    method: method,
    url: endPoint as string,
    headers: headers,
    responseType: responseType as ResponseType
  };

  if (method === 'GET') {
    config.params = payload;
  } else {
    config.data = payload;
  }

  try {
    const response: AxiosResponse = await axiosApi(config);
    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function axiosGet<T>(
  endPoint: string,
  payload = {},
  headers = {},
  responseType = 'json',
  customConfig: CustomAxiosConfigType = {}
) {
  const config: AxiosRequestConfig<any> = {
    method: 'GET',
    url: endPoint as string,
    params: payload,
    headers: { ...headers },
    responseType: responseType as ResponseType,
    ...customConfig
  };

  try {
    const response: AxiosResponse = await axiosApi(config);
    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 * Post Method
 */
export async function axiosPost<T>(
  endPoint: string,
  payload = {},
  headers = {},
  responseType = 'json',
  customConfig: AxiosRequestConfig = {}
) {
  const config: AxiosRequestConfig<any> = {
    method: 'POST',
    url: endPoint as string,
    data: payload,
    headers: { ...headers },
    responseType: responseType as ResponseType,
    ...customConfig
  };

  try {
    const response: AxiosResponse = await axiosApi(config);
    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 * Delete Method
 */
export async function axiosDel<T>(
  endPoint: string,
  payload = {},
  headers = {},
  responseType = 'json',
  customConfig: CustomAxiosConfigType = {}
) {
  const config: AxiosRequestConfig<any> = {
    method: 'DELETE',
    url: endPoint as string,
    data: payload ?? undefined,
    headers: headers,
    responseType: responseType as ResponseType
  };

  try {
    const response = await axiosApi(config);
    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 * PUT Method
 */
export async function axiosPut<T>(
  endPoint: string,
  payload = {},
  headers = {},
  responseType = 'json',
  customConfig: CustomAxiosConfigType = {}
) {
  const config: AxiosRequestConfig<any> = {
    method: 'PUT',
    url: endPoint as string,
    data: payload,
    headers: headers,
    responseType: responseType as ResponseType
  };

  try {
    const response: AxiosResponse = await axiosApi(config);
    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function axiosPatch<T>(
  endPoint: string,
  payload = {},
  headers = {},
  responseType = 'json',
  customConfig: CustomAxiosConfigType = {}
) {
  const config: AxiosRequestConfig<any> = {
    method: 'PATCH',
    url: endPoint as string,
    data: payload,
    headers: headers,
    responseType: responseType as ResponseType
  };

  try {
    const response = await axiosApi(config);
    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
