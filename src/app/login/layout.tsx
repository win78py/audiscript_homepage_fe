import Container from '@/base/components/Container';
import { Spin } from 'antd';
import { Suspense } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Spin indicator={<LoadingOutlined style={{color:'#692AFA'}} spin />} size='large'/>}>
      <Container>{children}</Container>
    </Suspense>
  );
}
