// import { CustomerStageEnum } from '@/app/components/AppBar/config';

export type AuthProps = {
  isLoggedIn: boolean;
  customer?: CustomerInfo | null;
  destinationUrl?: string | null;
};
export type CustomerInfo = {
  email?: string[];
  profileImage?: string;
  name?: string;
  id?: number;
  refreshToken?: string;
  accessToken?: string;
  username?: string;
  mobilephone?: string;
  ip?: string;
  no?: number;
  group?: {
    id: number;
    name: string;
  };
  position?: {
    id: number;
    name: string;
  };
  address?: string;
  addressDetail?: string;
//   stage?: CustomerStageEnum;
  type?: string;
  sign_up?: any;
  representativeName?: any;
  corporationNo?: any;
  corporationName?: any;
  businessNo?: any;
  telephone?: any;
};
export type DecodeToken = {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  is_del: number;
  manager_delete_reason: string;
  manager_delete_etc_reason: string;
  user_id: number;
  iat: number;
  exp: number;
  accessToken: string;
};
export type LoginData = {
  id: string;
  password: string;
  otp?: string;
  socketId?: string;
};
export type AuthContextType = {
  isLoggedIn: boolean;
  destinationUrl?: string | null;
  customer?: CustomerInfo | null | undefined;
  login: (data: LoginData) => void;
  logout: (token: string) => void;
  register: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: CustomerInfo) => Promise<void>;
  shouldAddBottomPadding: boolean;
  setShouldAddBottomPadding: (val: boolean) => void;
};
