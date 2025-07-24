export const LIST_TABLE_PAGE_SIZE = 20;
const HOST_SERVER = process.env.NEXT_PUBLIC_BASE_URL;
const HOST_TEST = process.env.NEXT_PUBLIC_TEST_URL;

export const MAX_STRING_INPUT_LENGTH = 50;
export const MAX_NUMBER_INPUT_LENGTH = 11;

export const API_URL = process.env.NODE_ENV === 'development' ? `${HOST_TEST}/` : `${HOST_SERVER}/`;
// export const API_URL = `${HOST_TEST}/api`;
// export const KAKAO_JAVASCRIPT_KEY = process.env.KAKAO_JAVASCRIPT_KEY;
// export const KAKAO_CALLBACK_URL = process.env.KAKAO_CALLBACK_URL;
export const BACKEND_HOST = process.env.NEXT_PUBLIC_BACKEND_HOST ? process.env.NEXT_PUBLIC_BACKEND_HOST : 'https://dev.702prime.com';
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ? process.env.NEXT_PUBLIC_BACKEND_URL : 'https://dev.702prime.com/api';

export const HASHIDS_SALT = process.env.NEXT_PUBLIC_HASHIDS_SALT;
