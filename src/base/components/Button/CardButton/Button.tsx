import React, { CSSProperties, ReactNode } from 'react';

import {
  Button as AnButton,
  ButtonProps as AnButtonProps,
  ConfigProvider,
} from 'antd';

export interface ButtonProps extends Omit<AnButtonProps, 'isSelected'> {
  icon?: ReactNode;
  isSelected?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  style,
  variant,
  size = 'large',
  icon,
  shape,
  isSelected = false,
  ...props
}) => {
  const customStyle: CSSProperties = {
    fontWeight: size === 'large' ? 600 : 500,
    fontSize: size === 'large' ? 14 : 12,
    padding:
      size === 'large'
        ? '8px 16px'
        : size === 'middle'
        ? '6px 12px'
        : '4px 8px',
    height: size === 'large' ? 36 : size === 'middle' ? 28 : 24,
    width: 'fit-content',
    borderRadius: 8,
    gap: 4,
    ...style,
  };

  //   const getIconSize = (size: string) => {
  //     switch (size) {
  //       case 'large':
  //         return 16;
  //       case 'middle':
  //         return 12;
  //       case 'small':
  //         return 12;
  //       default:
  //         return 16;
  //     }
  //   };

  const buttonProps: AnButtonProps = {
    ...props,
    style: customStyle,
    type: undefined, // exclude 'secondary' type,
    color: undefined,
  };

  const disableColor = (color: string) => {
    return `color-mix(in srgb, ${color} 50%, transparent)`;
  };

  const getColor = () => {
    return {
      // enable
      ...(isSelected
        ? {
            defaultColor: 'var(--base-fg-color-base-fg-90, #0F162A)',
            defaultBorderColor:
              'var(--Card-Button-primary-stroke-selected, #692AFA)',
            defaultBg: 'var(--button-secondary-bg-enabled, #FFFFFF)',
          }
        : {
            defaultColor: 'var(--base-fg-color-base-fg-60, #475069)',
            defaultBorderColor:
              'var(--Card-Button-primary-stroke-enabled, #E2E5F0)',
            defaultBg: 'var(--button-secondary-bg-enabled, #FFFFFF)',
          }),

      // hovered
      defaultHoverColor: 'var(--base-fg-color-base-fg-60, #475069)',
      defaultHoverBorderColor:
        'var(--Card-Button-primary-stroke-hovered, #E2E5F0)',
      defaultHoverBg: 'var(--Card-Button-primary-bg-hovered, #F3F2FF)',

      // pressed
      defaultActiveColor: 'var(--Card-Button-primary-fg-pressed, #333C55)',
      defaultActiveBg: 'var(--Card-Button-primary-bg-pressed, #EAE7FF)',
      defaultActiveBorderColor:
        'var(--Card-Button-primary-stroke-pressed, #692AFA)',

      // disable
      colorTextDisabled: disableColor(
        'var(--base-fg-color-base-fg-60, #475069)'
      ),
      colorBgContainerDisabled: disableColor(
        'var(--button-secondary-bg-enabled, #FFFFFF)'
      ),
      borderColorDisabled: disableColor(
        'var(--Card-Button-primary-stroke-enabled, #E2E5F0)'
      ),
    };
  };

  const iconWithProps =
    icon &&
    React.cloneElement(icon as React.ReactElement, {
      style: {
        color: getColor().defaultColor,
        flexShrink: 0,
        fontSize: 24,
        // allow icon with override custom style, ex: icon={<NewWrite style={{ fontSize: 20 }} />}
        ...((icon as React.ReactElement).props.style || {}),
      },
    });

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            ...getColor(),
          },
        },
      }}
    >
      <AnButton {...buttonProps} icon={iconWithProps} />
    </ConfigProvider>
  );
};

export default Button;
