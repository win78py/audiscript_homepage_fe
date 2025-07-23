import { isObject } from 'lodash';

export const keyStringify = (data: { [key: string]: any }, preKey: string = ''): { [key: string]: any } => {
  let newData: { [key: string]: any } = {};

  for (const i in data) {
    if (isObject(data[i])) {
      newData = { ...newData, ...keyStringify(data[i], i) };
    } else {
      newData[preKey ? `${preKey}.${i}` : i] = data[i];
    }
  }

  return newData;
};

export const utf8ToBase64 = (str: string) => {
  try {
    const utf8Bytes = new TextEncoder().encode(str);
    const binary = Array.from(utf8Bytes)
      .map((byte) => String.fromCharCode(byte))
      .join('');
    return btoa(binary);
  } catch (error) {
    console.error('Error in utf8ToBase64:', error);
    return '';
  }
};

export const base64ToUtf8 = (base64: string) => {
  try {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch (error) {
    console.error('Error in base64ToUtf8:', error);
    return '';
  }
};
