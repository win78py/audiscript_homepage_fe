"use client";

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { authAtom } from '@/base/store/atoms/auth';
import useUserActions from '@/base/hooks/useUserActions';
import useToast from '@/base/hooks/useToast';
import { isValidJSON } from '@/base/utils/helper';
import { usePathname } from 'next/navigation';
import { COOKIE_KEY_CUSTOMER, getCookie } from '@/base/hooks/useCookies';
import { BACKEND_HOST } from '@/base/configs';

interface SocketContextType {
  socket: Socket;
  kmcVerified: boolean;
  setKmcVerified: (v: boolean) => void;
  kmcPhoneNumber: string;
  setKmcPhoneNumber: (v: string) => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return socket;
};

const KMCService = () => {
  const getInfo = async (params: any) => {
    try {
      const NODE_SERVER = process.env.NEXT_PUBLIC_NODE_SERVER ?? 'dev';
      const KMC_REQUEST_URL =
        NODE_SERVER === 'prod'
          ? `https://mng.702prime.com/hskmcis/kmcis_rental_04.jsp?mode=1&tr_url=`
          : NODE_SERVER === 'qa'
          ? `https://qa-mng.702prime.com/hskmcis/kmcis_rental_04.jsp?mode=1&tr_url=`
          : NODE_SERVER === 'test'
          ? `https://test.702prime.com/hskmcis/kmcis_rental_04.jsp?mode=1&tr_url=`
          : `https://dev.702prime.com/kmcis/KMCIS/kmcis_rental_04.jsp?mode=1&tr_url=`;
      const res = await axios.get(KMC_REQUEST_URL, {
        headers: { 'Content-Type': 'application/json' },
        params: params
      });
      return res?.data;
    } catch (error) {
      return { phoneNo: '' };
    }
  };

  return { getInfo };
};

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [kmcVerified, setKmcVerified] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const [kmcPhoneNumber, setKmcPhoneNumber] = useState<string>('');
  const { getInfo } = KMCService();
  // const [authData, setAuthAtom] = useRecoilState(authAtom);
  const authCookie = getCookie(COOKIE_KEY_CUSTOMER);
  const { logout } = useUserActions();
  const showToast = useToast();

  const pathname = usePathname();

  useEffect(() => {
    console.log('Change route and set default');
    setKmcVerified(false);
    setKmcPhoneNumber('');
  }, [pathname]);

  useEffect(() => {
    if (!socketRef.current || authCookie?.customer?.id) {
      socketRef.current = io(BACKEND_HOST, {
        path: process.env.NEXT_PUBLIC_NODE_SERVER === 'dev' ? '/socket.io' : '/api/socket.io',
        transports: ['websocket', 'polling'],
        auth: {
          userId: authCookie?.customer?.id
        }
      });
    }

    const socket = socketRef.current;

    socket &&
      socket.on('connect', () => {
        console.log('Connected socket:', socket?.id);
      });

    socket &&
      socket.on('logout', (socketMsg: string) => {
        console.log('Logout message from server:', socketMsg);
        logout(authCookie?.customer?.accessToken || '');
        showToast({ content: '다른 기기에서 로그인되어 현재 로그인이 종료되었습니다.', type: 'warning' });
      });

    socket &&
      socket.on('KMCIDCallback', async (data: string) => {
        console.log('Received from socket:', data);
        const test = isValidJSON(data) ? JSON.parse(data) : {};
        const payload = { apiToken: test?.apiToken, apiCertNum: test?.certNum };
        const testapi = await getInfo(payload);
        console.log('phone no:', testapi?.phoneNo);
        setKmcPhoneNumber(testapi?.phoneNo || '');
        setKmcVerified(true);
      });

    return () => {
      socket && socket.off('KMCIDCallback');
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current!, kmcVerified, setKmcVerified, kmcPhoneNumber, setKmcPhoneNumber }}>
      {children}
    </SocketContext.Provider>
  );
}
