import { App } from 'antd';

type MessageType = 'success' | 'error' | 'info' | 'warning' | 'loading';

interface ToastOptions {
  content: string;
  duration?: number;
  type?: MessageType;
  onClose?: () => void;
}

const useToast = () => {
  const { message } = App.useApp();

  const showToast = ({
    content,
    duration = 3,
    type = 'info',
    onClose,
  }: ToastOptions) => {
    const options = { content, duration, onClose };
    switch (type) {
      case 'success':
        message.success(options);
        break;
      case 'error':
        message.error(options);
        break;
      case 'info':
        message.info(options);
        break;
      case 'warning':
        message.warning(options);
        break;
      case 'loading':
        message.loading(options);
        break;
      default:
        message.info(options);
        break;
    }
  };

  return showToast;
};

export default useToast;