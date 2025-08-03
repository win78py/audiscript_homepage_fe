'use client';
import { CSSProperties, forwardRef, useState } from 'react';

import { ConfigProvider, Flex, Select, SelectProps } from 'antd';
import IconChevronDown from '@/base/icons/IconChevronDown';


export interface CustomSelectProps extends SelectProps {
  customBgColor?: string;
  active?: boolean;
  danger?: boolean;
  size?: SelectProps['size'];
  suffixGap?: number;
  suffix?: React.ReactNode;
  containerStyle?: React.CSSProperties;
  customStyle?: React.CSSProperties;
  placeholder?: string;
}

const CustomSelect = forwardRef<HTMLDivElement, CustomSelectProps>(
  ({ customBgColor, style, active, danger, suffixGap = 4, suffix, containerStyle, placeholder, ...props }, ref) => {
    const [rerender, setRerender] = useState<boolean>(false);
    const customStyle: CSSProperties = {
      borderRadius: 0,
      ...style
    };

    return (
      <ConfigProvider
        theme={{
          components: {
            Select:
              props.size === 'small'
                ? {
                    optionHeight: 28,
                    optionPadding: '6px 12px',
                    optionLineHeight: '16px',
                    optionFontSize: 12
                  }
                : props.size === 'middle'
                ? {
                    optionHeight: 36,
                    optionPadding: '8px 12px',
                    optionLineHeight: '20px',
                    optionFontSize: 14
                  }
                : {
                    optionHeight: 52,
                    optionPadding: '16px 12px',
                    optionLineHeight: '20px',
                    optionFontSize: 14
                  }
          }
        }}
      >
        <Flex align="center" gap={suffixGap} style={{ ...containerStyle }}>
          <Select
            style={{ flex: 1, height: props.size === 'large' ? 52 : props?.customStyle?.height ?? undefined, ...customStyle }}
            suffixIcon={<IconChevronDown style={{ fontSize: props.size === 'small' ? 12 : 16, pointerEvents: 'none' }} />}
            {...props}
            onChange={(value, option) => {
              setRerender((prev: boolean) => !prev);
              if (typeof props.onChange === 'function') {
                props.onChange(value, option);
              }
            }}
            dropdownAlign={{ offset: [0, 0] }}
            placeholder={placeholder}
          />
          {suffix}
        </Flex>
      </ConfigProvider>
    );
  }
);

export default CustomSelect;
