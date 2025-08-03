import { atom } from 'recoil';

export const appSignatureAtom = atom<{ [x: string]: string }>({
  key: 'appSignatureAtom',
  default: {}
});
