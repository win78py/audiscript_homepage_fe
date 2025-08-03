'use client';
import { AuthProps } from '@/base/types/auth';
import { atom } from 'recoil';

export const authAtom = atom<AuthProps>({
  key: 'authAtom',
  default: {
    isLoggedIn: false,
    customer: null,
    destinationUrl: null
  }
});
