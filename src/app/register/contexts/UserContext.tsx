'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

export interface UserData {
  terms: Record<string, boolean>;
  personalInfo?: {
    id: string;
    password: string;
    // name: string;
    // mobilephone: string;
    // birthdate: string;
    // sex: string;
    email: string;
    // postalCode: string;
    // address: string;
    // addressDetail: string;
  };
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  resetUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    terms: {},
    personalInfo: undefined
  });

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const resetUserData = () => {
    setUserData({
      terms: {},
      personalInfo: undefined
    });
  };

  return <UserContext.Provider value={{ userData, updateUserData, resetUserData }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
