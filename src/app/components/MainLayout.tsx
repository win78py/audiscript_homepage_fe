'use client';
import { ReactNode, Suspense } from 'react';

import { APP_BAR_HEIGHT } from '@/base/configs/config';
// import Footer from './Footer';
// import MyAppBar from './AppBar';
// import VirtualCheckingIsScroll from './VirtualCheckingIsScroll';
import { Flex, Spin } from 'antd';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/base/configs/queryClient';
import { RecoilRoot } from 'recoil';
// import { AuthProvider } from '@/base/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import useDevice from '@/base/hooks/useDevice';
// import ClientProviders from './AppBar/ClientProviders';
import { LoadingOutlined } from '@ant-design/icons';
import MyAppBar from './AppBar';
// import SessionExpireChecker from './AppBar/SessionExpireChecker';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;
  const pathname = usePathname();

  const excludePaths = ['/success', '/fail', '/contract-sell-view', '/contract-buy-view'];
  const isExcluded = excludePaths.some((ele) => pathname.includes(ele));
  const { isMobile, isTablet, isDesktop } = useDevice();

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
        <RecoilRoot>
          {/* <ClientProviders> */}
            {/* <AuthProvider> */}
              {isExcluded ? (
                <Suspense fallback={<Spin indicator={<LoadingOutlined style={{ color: '#692AFA' }} spin />} size="large" />}>
                  {children}
                </Suspense>
              ) : (
                <Suspense fallback={<Spin indicator={<LoadingOutlined style={{ color: '#692AFA' }} spin />} size="large" />}>
                  {(isDesktop !== undefined || isTablet !== undefined || isMobile !== undefined) && (
                    <>
                      <MyAppBar />
                      {/* <SessionExpireChecker /> */}
                      <Flex style={{ width: '100%', height: `calc(100% - ${APP_BAR_HEIGHT}px)` }}>
                        <Flex vertical style={{ height: '100%', width: '100%', overflowX: 'hidden' }} className="scroll-box">
                          {/* <VirtualCheckingIsScroll /> */}
                          {children}
                          {/* <Footer /> */}
                        </Flex>
                      </Flex>
                    </>
                  )}
                </Suspense>
              )}
            {/* </AuthProvider> */}
          {/* </ClientProviders> */}
        </RecoilRoot>
      </div>
    </QueryClientProvider>
  );
};

export default MainLayout;
