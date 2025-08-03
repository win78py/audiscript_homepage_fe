import { atom } from 'recoil';

export const findIdAtom = atom<{ id: string; phone: string; name: string }>({
  key: 'findIdAtom',
  default: {
    id: '',
    phone: '',
    name: ''
  }
});
