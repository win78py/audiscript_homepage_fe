import { useEffect, useRef, useState } from 'react';

import { useRecoilState, useResetRecoilState } from 'recoil';

import { getCookie, setCookie, removeCookie, COOKIE_KEY_CUSTOMER } from './useCookies';
import useToast from './useToast';
import { authAtom } from '../store/atoms/auth';
import { LoginData, CustomerInfo } from '../types/auth';
import authServices from '../services/authServices';
import { usePathname } from 'next/navigation';
import { appSignatureAtom } from '../store/atoms/signature';
const useUserActions = () => {
  const [loadingApp, setLoadingApp] = useState(false);
  const [authData, setAuthAtom] = useRecoilState(authAtom);
  const resetSignature = useResetRecoilState(appSignatureAtom);
  const showToast = useToast();
  const [cookies] = useState(getCookie(COOKIE_KEY_CUSTOMER));
  const cookiesRef = useRef(cookies);
  const pathname = usePathname();
  useEffect(() => {
    cookiesRef.current = cookies;
  }, [cookies]);

  const login = (params: LoginData) => {
    return authServices.login(params as LoginData);
  };

  const getNewAccessToken = () => {
    return authServices.getNewAccessToken();
  };

  const logout = async (token: string) => {
    // const res: any = await authServices.logout(token);
    removeCookie(COOKIE_KEY_CUSTOMER);
    localStorage.removeItem('loginTime');
    setAuthAtom({
      isLoggedIn: false,
      customer: null
    });
    resetSignature();
    window.location.reload();
    // if (res?.success) {
    // }
  };

  const loginSuccess = async (data: any = null) => {
    try {
      if (data) {
        setCookie(COOKIE_KEY_CUSTOMER, {
          ...cookiesRef.current,
          customer: data?.customer,
          accessToken: data?.token ?? data?.accessToken,
          refreshToken: data?.refreshToken
        });
        setAuthAtom((prev) => ({
          ...prev,
          isLoggedIn: true,
          customer: { ...data?.customer, accessToken: data?.token ?? data?.accessToken, refreshToken: data?.refreshToken },
          destinationUrl: pathname !== '/' ? pathname : null
        }));
        setLoadingApp(false);
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  const setNewAccessToken = async (val: string) => {
    setCookie(COOKIE_KEY_CUSTOMER, {
      ...cookiesRef.current,
      accessToken: val
    });
    setAuthAtom((prev) => {
      return {
        ...prev,
        isLoggedIn: true,
        customer: { ...prev.customer, accessToken: val }
      };
    });
  };

  const checkRefreshToken = async (refreshToken: string) => {
    try {
      if (refreshToken) {
        const res: any = await authServices.refreshToken({ refreshToken });
        if (res) {
          setNewAccessToken(res?.data?.token);
        }
        return res;
      }
    } catch (error) {
      return false;
    }
  };

  const updateProfile = async (data: CustomerInfo) => {
    const res = await authServices.update({ ...data, id: authData.customer?.id });
    if (res?.success) {
      showToast({ content: '업데이트가 완료되었습니다.', type: 'success' });
      setAuthAtom((prev) => ({
        ...prev,
        customer: { ...prev?.customer, ...data }
      }));
      setCookie(COOKIE_KEY_CUSTOMER, { ...authData?.customer, ...data });
    }
  };
  const register = () => {};
  const resetPassword = (email: string) => new Promise<void>((resolve, reject) => {});

  const socialLoginKakao = async (params: { code?: string; access_token?: string; d1: boolean; d2: boolean; d3: boolean }) => {
    const { code, d1, d2, d3 } = params;
    console.log('Auth > Kakao > Login > Code:', code);
    const res = await authServices.loginWithKakao(params);
    // console.log('response from  be', res);
    return res;
  };

  const socialLoginNaver = async (code: string) => {
    console.log('Auth > Naver > Login > Code:', code);
    const res = await authServices.loginWithNaver(code);
    // console.log('response from  be', res);
    return res;
  };

  const consentItems = async (docs1: boolean, docs2: boolean, docs3: boolean) => {
    const res = await authServices.consentItems({ docs1, docs2, docs3 }, authData?.customer?.accessToken || '');
    if (res?.success) {
      const { customer } = authData;
      delete customer?.sign_up;
      setAuthAtom((prev) => ({
        ...prev,
        customer: { ...customer }
      }));
      setCookie(COOKIE_KEY_CUSTOMER, {
        ...cookiesRef.current,
        customer: customer
      });
    }
    return res;
  };

  const getIDbyNamePhone = async (name: string, phone: string, id?: string) => {
    const res = await authServices.getIDByNamePhone(name, phone, id);
    return res;
  };

  const changePassword = async (name: string, phone: string, id: string, newPassword: string) => {
    const res = await authServices.changePassword(name, phone, id, newPassword);
    return res;
  };

  return {
    login,
    logout,
    register,
    resetPassword,
    updateProfile,
    loadingApp,
    loginSuccess,
    socialLoginKakao,
    socialLoginNaver,
    checkRefreshToken,
    setNewAccessToken,
    consentItems,
    getIDbyNamePhone,
    changePassword,
    getNewAccessToken
  };
};

export default useUserActions;
