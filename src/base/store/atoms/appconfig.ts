import { atom } from 'recoil';

export const appConfig = atom<{
  baseSetting: {
    [x: string]: string;
  };
  menuList: any[];
  permission: {
    [x: string]: any;
  };
  isVendor: boolean;
}>({
  key: 'appConfig',
  default: {
    baseSetting: {},
    menuList: [],
    permission: {},
    isVendor: false
  }
});

export const appMenuCountConfig = atom<{
  purchase: [];
  product: [];
}>({
  key: 'appMenuCountConfig',
  default: {
    purchase: [],
    product: []
  }
});
