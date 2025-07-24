'use client';
import { JSX, ReactNode, useMemo } from 'react';

import { Modal, ModalProps, Typography } from 'antd';
import IconX from '@/base/icons/XIcon';


// const HeaderModalHeight = 26;
// const FooterModalHeight = 32;

type BaseModalProps = {
  modalTitle?: string | JSX.Element;
  open?: boolean;
  onClose?: () => void;
  onOk?: () => void;
  children?: ReactNode;
  width?: string | number;
  modalProps?: ModalProps;
  style?: React.CSSProperties;
  header?: React.ReactNode;
  height?: string | number;
  fullScreen?: boolean;
  isCentered?: boolean;
};

const BaseModal = (props: BaseModalProps) => {
  const {
    isCentered = true,
    modalTitle,
    children,
    open = false,
    onClose,
    // onOk,
    width = 686,
    height,
    modalProps,
    style,
    header,
    fullScreen
  } = props;

  const ModalTitleMemo = useMemo(() => {
    if (typeof modalTitle === 'string') {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBlock: 12,
            paddingInline: 20,
            borderBottom: ' 1px solid var(--base-stroke-color-base-stroke-20, #E2E5F0)'
          }}
        >
          <Typography className="title-sm" style={{ color: 'var(--base-fg-color-base-fg-60, #475069)' }}>
            {modalTitle}
          </Typography>
          <IconX style={{ fontSize: 16, padding: 4, color: 'var(--base-fg-color-base-fg-60, #475069)' }} onClick={() => onClose && onClose()} />
        </div>
      );
    } else if (typeof modalTitle !== 'undefined') {
      return modalTitle;
    } else if (header) {
      return header;
    } else {
      return <></>;
    }
  }, [modalTitle, header, onClose]);

  return (
    <Modal
      zIndex={1500}
      open={open}
      centered={isCentered}
      width={width}
      height={height ? height : 'auto'}
      title={ModalTitleMemo}
      footer={null}
      closable={false}
      // style={{ top: 160, ...style }}
      style={
        fullScreen
          ? {
              top: 0,
              margin: 0,
              padding: 0,
              maxWidth: '100vw',
              ...style
            }
          : undefined
      }
      styles={
        !fullScreen
          ? {
              header: {
                marginBottom: 0,
                borderRadius: '8px 8px 0 0'
              },
              body: {},
              content: {
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: 'transparent'
              }
            }
          : {
              header: {
                marginBottom: 0,
                borderRadius: '0'
                // padding: 0
              },
              body: {
                padding: 0,
                height: '100vh'
              },
              content: {
                borderRadius: 0,
                overflow: 'auto',
                margin: 0,
                maxWidth: '100vw',
                height: '100vh',
                maxHeight: '100vh'
              },
              wrapper: {
                padding: 0
              },
              mask: {
                backgroundColor: 'transparent'
              }
            }
      }
      {...modalProps}
    >
      {children}
    </Modal>
  );
};

export default BaseModal;
