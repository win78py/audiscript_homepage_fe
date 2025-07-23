'use client';

import { ButtonProps as AnButtonProps } from 'antd';
import Button, { ButtonProps } from '../CustomButton';
import { useRouter } from 'next/navigation';

export interface LinkButtonProps extends Omit<ButtonProps, 'to'> {
  to: string;
}

const LinkButton = (props: LinkButtonProps) => {
  const { children, to, ...others } = props;
  const router = useRouter();

  return (
    <Button
      {...others}
      onClick={() => {
        router.push(to);
      }}
    >
      {children}
    </Button>
  );
};

export default LinkButton;
