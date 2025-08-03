"use client";
import React, { createContext, useEffect, useState } from "react";

import { useRecoilState } from "recoil";

import { usePathname } from "next/navigation";
import { getCookie, COOKIE_KEY_CUSTOMER } from "../hooks/useCookies";
import useUserActions from "../hooks/useUserActions";
import { authAtom } from "../store/atoms/auth";
import { AuthContextType } from "../types/auth";
// import ConsentItems from '../components/ConsentItems';

// ==============================|| Vora Auth CONTEXT & PROVIDER ||============================== //

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [shouldAddBottomPadding, setShouldAddBottomPadding] = useState(false);
  const [auth, setAuth] = useRecoilState(authAtom);
  // console.log('auth ada', auth, !!auth.customer?.sign_up);
  const [isOpen, setIsOpen] = useState<boolean>(!!auth.customer?.sign_up);
  const userActions = useUserActions();
  const userCookie = getCookie(COOKIE_KEY_CUSTOMER);

  // const consentItems = async (d1: boolean, d2: boolean, d3: boolean) => {
  //   const res = await userActions.consentItems(d1, d2, d3);
  //   console.log(res);
  // };

  const pathname = usePathname();
  useEffect(() => {
    const checkSignUp = () => {
      if (!!userCookie?.customer?.sign_up) {
        setIsOpen(true);
      }
    };
    checkSignUp();
  }, [userCookie, userActions, setAuth, pathname]);

  useEffect(() => {
    const checkIsLoggedIn = () => {
      if (userCookie?.accessToken) {
        userActions.loginSuccess(userCookie);
      } else {
        setAuth({
          isLoggedIn: false,
          customer: null,
          destinationUrl: pathname !== "/" ? pathname : null,
        });
      }
    };
    checkIsLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        ...userActions,
        shouldAddBottomPadding,
        setShouldAddBottomPadding,
      }}
    >
      {userActions.loadingApp ? <div>...</div> : children}
      {/* {isOpen && <ConsentItems isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={consentItems} />} */}
    </AuthContext.Provider>
  );
};

export default AuthContext;
