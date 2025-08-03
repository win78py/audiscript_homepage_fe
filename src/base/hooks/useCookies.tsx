import Cookies from 'js-cookie';

export const COOKIE_EXPIRE_TIME = new Date(Date.now() + 60 * 60 * 1000); //Days
export const COOKIE_KEY_CUSTOMER = 'customer';

const defaultCustomerCookieConfig: Cookies.CookieAttributes = {
  expires: COOKIE_EXPIRE_TIME
  // path: '/',
};

export const setCookie = (name: string, data: any, config: Cookies.CookieAttributes = {}) => {
  return Cookies.set(
    name,
    JSON.stringify(data),
    name === COOKIE_KEY_CUSTOMER
      ? { ...defaultCustomerCookieConfig, secure: true, sameSite: 'Lax' }
      : { ...config, secure: true, sameSite: 'Lax' }
  );
};

export const removeCookie = (name: string, config: any = {}) => {
  return Cookies.remove(name, config);
};

export const getCookie = (name: string) => {
  const cookieData = Cookies.get(name) !== undefined ? Cookies.get(name) : null;
  let results;

  if (cookieData) {
    try {
      results = JSON.parse(cookieData);
    } catch (error) {
      console.error('Error when parse JSON data:', error);
    }
  } else {
    // console.log('Cookie not exists or empty.');
  }

  return results;
};
