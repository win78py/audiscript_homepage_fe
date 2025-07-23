import Hashids from 'hashids';
import { HASHIDS_SALT } from '.';
// import { HASHIDS_SALT } from '.';

export const APP_BAR_HEIGHT = 108;
export const APP_BAR_MOBILE_HEIGHT = 90;
export const TOP_APP_BAR_HEIGHT = 40; // 로그인 - 회원가입 - 마이페이지
export const MAIN_APP_BAR_HEIGHT = 68; // 내차사기 - 내차팔기 - KGM 인증소개 - 이벤트 - 고객지원 - bug Luong
// Side bar
export const SIDE_BAR_WIDTH = 240;
export const SIDE_BAR_MIN_WIDTH = 190;
export const SIDE_BAR_MAX_WIDTH = 260;
export const SIDE_BAR_MINI_WIDTH = 40;
export const SIDE_BAR_ITEM_HEIGHT = 32;
// Top menu items
export const HEADER_HEIGHT = 48;
export const TOP_MENU_HEIGHT = 50;
export const TOP_MENU_WIDTH = 60;
export const TOP_MENU_LENGTH = 6;
// setitng List
export const SPLIT_DEFAULT_SIZE_PERCENT = 20; // precent
export const SPLIT_MIN_SIZE = 320;
export const SPLIT_MAX_SIZE = 500;
// Page
export const CONTAINER_TITLE_HEIGHT = 55;
export const CONTAINER_PADDING_X = 2;

export const localeMap: { [userLocale: string]: string } = {
  vi: 'vi',
  ko: 'ko',
  jp: 'ja'
};

const MIN_LENGTH_HASHIDS = 8;

export const hashids = new Hashids(HASHIDS_SALT, MIN_LENGTH_HASHIDS);
