import { INSTALLMENT_PERIOD } from '@/app/used-car/configs';
import { createBadges } from '@/app/used-car/helper/Helper';
import { isObject } from 'lodash';
import { Product } from '../types/product';
import dayjs, { Dayjs } from 'dayjs';
import { groupMngMap } from '../types';
import { UnlimitedEnum } from '@/app/used-car/types/config';

export const EMPTY_TEXT = '보증 정보 없음';

export const numberWithCommas = (value: number | string) => {
  if (!value) {
    return 0;
  }
  const valueString = value.toString();
  const positionAddComma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
  return valueString.replace(positionAddComma, ',');
};

export const floatFormatter = (value: any) => {
  if (value == null || value === '') return '';
  const parts = value.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};
// export const getExpirationDate = (contractCompletedAt: string | Date): string | null => {
//   const completedDate = new Date(contractCompletedAt);
//   if (isNaN(completedDate.getTime())) {
//     return null;
//   }

//   completedDate.setMinutes(completedDate.getMinutes() + 5);

//   const year = completedDate.getFullYear();
//   const month = String(completedDate.getMonth() + 1).padStart(2, '0');
//   const day = String(completedDate.getDate()).padStart(2, '0');
//   const hours = String(completedDate.getHours()).padStart(2, '0');
//   const minutes = String(completedDate.getMinutes()).padStart(2, '0');
//   const seconds = String(completedDate.getSeconds()).padStart(2, '0');

//   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// };

export const inputNumberKorWitCommas = (value: number | string) => {
  const cleaned = value.toString().replace(/,/g, '');
  if (cleaned === '') return '';
  const number = Number(cleaned);
  if (isNaN(number)) return '';
  return number.toLocaleString('ko-KR');
};

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

export const filterEmptyParams = (obj: Record<string, any>) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v));

export const formatKRNumber = (num: number): string => {
  return num.toLocaleString('ko-KR');
};

export const convertCarDataList = (stockList?: CarData[]) => {
  return stockList?.map((item) => ({
    ...item,
    badges: createBadges(item.vehicleFeatures),
    thumbnail: '/images/product/5_sedan.webp',
    name: item.MODELNAME,
    basePrice: item.CAR_ADP,
    salePrices: item.CAR_ADP_HD,
    isSales: item.LIS_TYP.includes('01'),
    installment: {
      perMonth: Math.round((item.CAR_ADP * 1000) / INSTALLMENT_PERIOD / 10000) * 10000,
      totalMonth: INSTALLMENT_PERIOD
    },
    otherSpec: {
      year: `${item.YEAR}년형`,
      millage: `${item.MILEAGE}km`,
      engines: item.FUEL
    }
  }));
};

// Helper function to check if a string is purely Korean
export const isKorean = (str: string) => {
  const regExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/;
  return regExp.test(str);
};

// Helper function to check if a string is purely English
export const isEnglish = (str: string) => {
  const regExp = /^[a-zA-Z0-9]*$/;
  return regExp.test(str);
};

// Main function to sort models by first word (with locale-aware comparison)
export const sortProductsByName = (models: Product[]) => {
  // Split by first word and sort accordingly
  const korean = models
    .filter((model) => isKorean(model.name))
    .sort((a, b) => {
      const aName = a.name.trim().split(' ')[0];
      const bName = b.name.trim().split(' ')[0];
      return aName.localeCompare(bName, 'ko');
    });

  const english = models
    .filter((model) => isEnglish(model.name))
    .sort((a, b) => {
      const aName = a.name.trim().split(' ')[0];
      const bName = b.name.trim().split(' ')[0];
      return aName.localeCompare(bName, 'en');
    });

  const other = models
    .filter((model) => !isKorean(model.name) && !isEnglish(model.name))
    .sort((a, b) => {
      const aName = a.name.trim().split(' ')[0];
      const bName = b.name.trim().split(' ')[0];
      return aName.localeCompare(bName);
    });

  // Combine the sorted arrays: first Korean, then English, then other
  return [...english, ...korean, ...other];
};
export function getMonthDiff(fromDateStr?: string, toDateStr?: string): number | null {
  if (!fromDateStr || !toDateStr) return null;

  const start = dayjs(fromDateStr);
  const end = dayjs(toDateStr);

  if (end.isBefore(start)) return 0;

  return end.diff(start, 'month');
}
export function getFormattedDateDiff(fromDateStr?: string, toDateStr?: string): string {
  if (!fromDateStr || !toDateStr) return '정보 없음';

  const fromDate = dayjs(fromDateStr);
  const toDate = dayjs(toDateStr);

  const monthsDiff = toDate.diff(fromDate, 'month');
  if (monthsDiff < 0) return '정보 없음';

  const years = Math.floor(monthsDiff / 12);
  const months = monthsDiff % 12;

  return `${years > 0 ? `${years}년 ` : ''}${months > 0 ? `${months}개월` : ''}`.trim() || '0개월';
}
export function getPercent(current?: number, original?: number, decimalPlaces: number = 2): number {
  if (!current || !original || original === 0) return 0;
  const percent = (current / original) * 100;
  return Math.min(100, Number(percent.toFixed(decimalPlaces)));
}
export function formatHourMinuteSecondForCountDown(time: number): string {
  const seconds = Math.floor(time / 1000);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h} : ${m >= 10 ? m : '0' + m} : ${s >= 10 ? s : '0' + s} 남음`;
}
export const customRoundPricingAmount = (number: number) => {
  // 5 digit
  if (number >= 100000000) {
    const numberStr = number.toString().slice(0, 5);
    const num = parseInt(numberStr);
    return Math.ceil(num / 10) * 10;
  }
  // 4 digit
  if (number >= 10000000) {
    const numberStr = number.toString().slice(0, 4);
    const num = parseInt(numberStr);
    return Math.floor(num / 10) * 10;
  }
  return 0;
};
export const addCommas = (val: string | number | undefined | null) => {
  if (!val) return val;
  if (typeof val === 'number') val = val.toString();
  const nonNumericCharacter = /[^0-9]/g;
  const insertCommaAtThirdPosition = /\B(?=(\d{3})+(?!\d))/g;

  const num = val.replace(nonNumericCharacter, '');
  return num.replace(insertCommaAtThirdPosition, ',');
};
// cái này dùng để format lại giá tiền
// 1.000.000 => 1000 만원
export function formatPricing(pricing: number) {
  const formatPricing = customRoundPricingAmount(pricing);
  const price = addCommas(formatPricing);
  return price;
}

//Chuyển date sang dạng yyyy.mm.dd
export function formatDate(input: string | Date, style: string = '.', take: number = 10, padding: number = 0): string {
  const date = new Date(input);
  if (padding !== 0) {
    date.setHours(date.getHours() + padding);
  }

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hour = `${date.getHours()}`.padStart(2, '0');
  const minute = `${date.getMinutes()}`.padStart(2, '0');
  const second = `${date.getSeconds()}`.padStart(2, '0');

  const fullString = `${year}${style}${month}${style}${day} ${hour}:${minute}:${second}`;

  return fullString.slice(0, take);
}

export function formatPhoneNumber(phone: string | undefined | null): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('010') && digits.length === 11) {
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  return phone;
}
//Chuyen hoa so dien thoai lai ve Og
export const getRawPhoneNumber = (formatted: string) => {
  return formatted.replace(/\D/g, '');
};

export const generateUUID = function () {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

export const isValidJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const parseToJSONArray = (str: string): any[] => {
  if (isValidJSON(str)) {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [];
  }
  return [];
};

export const allowOnlyDateInput = (e: KeyboardEvent) => {
  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', '-'];
  const isNumber = /^[0-9]$/.test(e.key);

  if (!isNumber && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }

  const input = e.target as HTMLInputElement;
  if (input && input.value.length >= 10 && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }

  if (input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 4 && value.length <= 6) {
      value = value.slice(0, 4) + '-' + value.slice(4);
    } else if (value.length > 6) {
      value = value.slice(0, 4) + '-' + value.slice(4, 6) + '-' + value.slice(6, 8);
    }
    input.value = value;
  }
};
export const allowOnlyYearInput = (e: KeyboardEvent) => {
  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', '-'];
  const isNumber = /^[0-9]$/.test(e.key);

  if (!isNumber && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }

  const input = e.target as HTMLInputElement;
  if (input && input.value.length >= 10 && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }

  if (input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 3) {
      value = value.slice(0, 3);
    }
    input.value = value;
  }
};

export function getWarrantyText(
  warrantyExpireDate: string,
  warrantyExpireKm: number,
  isUnlimitedFlag: boolean,
  currentMileage: number
): string {
  const expireDate = dayjs(warrantyExpireDate, 'YYYYMMDD');
  let DIFF_DATE_TEXT = '';
  if (!expireDate.isValid()) {
    DIFF_DATE_TEXT = '만료';
  } else {
    const now = dayjs().startOf('day');
    const totalDiffDay = expireDate.diff(now, 'day');
    const diffYear = Math.floor(totalDiffDay / 365);
    const remainingDaysAfterYears = totalDiffDay % 365;

    const diffMonth = Math.floor(remainingDaysAfterYears / 30);
    const diffDay = remainingDaysAfterYears % 30;

    if (expireDate.isBefore(now)) {
      DIFF_DATE_TEXT = '만료';
    } else if (expireDate.isSame(now)) {
      DIFF_DATE_TEXT = '오늘 만료';
    } else {
      if (diffYear > 0) {
        DIFF_DATE_TEXT += `${diffYear}년 `;
      }
      if (diffMonth > 0) {
        DIFF_DATE_TEXT += `${diffMonth}개월 `;
      }
      if (diffYear === 0 && diffMonth === 0 && diffDay > 0) {
        DIFF_DATE_TEXT += `${diffDay}일`;
      }
      const formattedDate = expireDate.format('YYYY.MM.DD');
      DIFF_DATE_TEXT += `(${formattedDate})`;
    }
  }

  if (isUnlimitedFlag) {
    return `${DIFF_DATE_TEXT}/ 무제한 남음`;
  } else {
    let remainingKmText = '';
    const remaining = warrantyExpireKm - currentMileage;
    if (remaining < 0) {
      remainingKmText = '만료';
    } else if (remaining > 10000) {
      remainingKmText = `${Math.floor(remaining / 10000)}만 km 남음`;
    } else {
      remainingKmText = `${remaining.toLocaleString()}km 남음`;
    }
    // const remainingKm = Math.max(0, Math.floor((warrantyExpireKm - currentMileage) / 10000));
    return `${DIFF_DATE_TEXT} / ${remainingKmText}`;
  }
}
export function getWarrantyTime(text: string, millage: number, unlimited: UnlimitedEnum): string {
  if (!text || !millage) {
    return '보증 정보 없음';
  }
  const timeStart = text;
  const timeEnd = unlimited === UnlimitedEnum.Unlimited ? '무제한' : (Number(millage) ? Number(millage) / 10000 : '-') + '만 Km';

  return `${timeStart ? timeStart : '0'}/${timeEnd}`;
}

export function calculateWarrantyProgressPercent(firstDateStr: string, expireDateStr: string, nowDateStr?: string): number {
  const firstDate = dayjs(firstDateStr, 'YYYYMMDD');
  const expireDate = dayjs(expireDateStr, 'YYYYMMDD');
  const nowDate = nowDateStr ? dayjs(nowDateStr, 'YYYYMMDD') : dayjs().startOf('day');

  const totalDays = expireDate.diff(firstDate, 'day');
  if (totalDays <= 0) return 0;

  let remainingDays = expireDate.diff(nowDate, 'day');
  if (remainingDays < 0) remainingDays = 0;

  const percentRemaining = (remainingDays / totalDays) * 100;

  return Math.round(percentRemaining * 100) / 100;
}

export function mapOptionValuesToBoolean(data: Record<string, any>) {
  const result: Record<string, any> = {};

  for (const key in data) {
    if (data[key] === 2) {
      result[key] = true;
    } else if (data[key] === 1) {
      result[key] = false;
    } else {
      result[key] = data[key];
    }
  }

  return result;
}

export const generateRepTeam = (parentGrId: number, groupMngId: number) => {
  if (parentGrId !== 0) return '';
  return groupMngMap[groupMngId] || '';
};

export const getEventStatus = (start: string, end: string, defaultStatus: string = '-') => {
  const now = dayjs().startOf('day');
  const s = dayjs(start).startOf('day');
  const e = dayjs(end).startOf('day');
  // console.log(s, e);
  if (now.isAfter(e)) return '마감';
  if ((now.isAfter(s) || now.isSame(s)) && (now.isBefore(e) || now.isSame(e))) return '진행중';
  return defaultStatus;
};

export const getExpirationDate = (
  regDate?: string | Date | null
): { expirationDate: Dayjs | null; expirationDateString: string | null } => {
  if (!regDate || !dayjs(regDate).isValid()) {
    return { expirationDate: null, expirationDateString: null };
  }

  const d = dayjs(regDate).add(7, 'day');
  const rounded = d.minute() >= 30 ? d.minute(30).second(0) : d.minute(0).second(0);

  return {
    expirationDate: rounded,
    expirationDateString: rounded.format('YYYY/MM/DD HH:mm')
  };
};
