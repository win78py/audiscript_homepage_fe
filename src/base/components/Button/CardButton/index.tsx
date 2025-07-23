import { CSSProperties, ReactNode } from 'react';
import CarIcon from './CarIcon';
import Typography from 'antd/es/typography/Typography';
import Button from './Button';
import IconUser from '@/base/icons/IconUser';
import IconUsers from '@/base/icons/IconUsers';

interface CardButtonProps {
  style?: CSSProperties;
  children?: ReactNode;
  isSelected?: boolean;
  order?:number;
  disabled?: boolean;
  onClick?: () => void;
}

const CardButton = (props: CardButtonProps) => {
  const { style, children, order, isSelected, disabled, onClick } = props;
  return (
    <Button
      variant="outlined"
      style={{ alignItems: 'center', justifyContent: 'flex-start', ...style }}
      icon={
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'var(--Card-Button-primary-bg-enabled, #FFFFFF)',
            backgroundColor: 'var(--base-bg-color-base-bg-5, #F8F9FC)'
          }}
        >
          {/* <CarIcon style={{ fontSize: 24 }} /> */}
          {order === 1 ? <IconUser/> : <IconUsers/>}
        </div>
      }
      isSelected={isSelected}
      disabled={disabled}
      onClick={onClick}
    >
      <Typography className="body-lg" style={{ fontWeight: isSelected ? 600 : 400 }}>
        {children}
      </Typography>
    </Button>
  );
};

export default CardButton;
