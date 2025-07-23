import { Grid } from 'antd';
import { useEffect, useState } from 'react';

const { useBreakpoint } = Grid;

const useDevice = () => {
  const screens = useBreakpoint();
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const isMobile = !screens.md;
  // const isTablet = screens.md && !screens.xl;
  // const isDesktop = screens.xl;

  const isSmallMobile = screens ? screens.xs && !screens.sm && !screens.md && !screens.lg : undefined;
  const isMobile = screens ? (screens.xs || screens.sm) && !screens.md && !screens.lg : undefined;
  const isTablet = screens ? screens.md && !screens.lg : undefined;
  const isDesktop = screens ? screens.lg || screens.xl || screens.xxl : undefined;

  const isBetween = (min: number, max: number) => width >= min && width <= max;

  return {
    isSmallMobile,
    isMobile,
    isTablet,
    isDesktop,
    screenWidth: width,
    isBetween
  };
};

export default useDevice;
