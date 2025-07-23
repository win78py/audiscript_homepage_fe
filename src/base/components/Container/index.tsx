import React, { CSSProperties, ReactNode } from 'react';
import './Container.style.css';

interface ContainerProps {
  children: ReactNode;
  style?: CSSProperties;
}

const Container = (props: ContainerProps) => {
  const { children, style } = props;

  return (
    <div className={'main-app-container'} style={style}>
      {children}
    </div>
  );
};

export default Container;
