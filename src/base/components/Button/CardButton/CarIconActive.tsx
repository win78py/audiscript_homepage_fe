'use client';
import Icon from '@ant-design/icons';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

export default function CarIconActive(props: IconComponentProps) {
  const Svg = () => (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" width="24" height="24" rx="12" fill="#692AFA" />
      <path
        d="M16.5 10.7929V7.00006C16.5 6.08721 15.6668 5.17355 14.0004 5.02286C13.7252 4.99797 13.2762 5.0005 12.9999 5.00033C12.4812 5 11.7164 5 11.5 5C9.5 5 8.5 6 8.5 7V10.7929C8.5 10.9256 8.44732 11.0527 8.35355 11.1465L7.75 11.7501C7.47323 12.0268 7.66925 12.5001 8.06066 12.5001C8.3033 12.5001 8.5 12.6968 8.5 12.9394V20.0013C8.5 21.0001 9.5 22.0001 11.5 22.0001C11.585 22.0001 13.4183 22.0018 13.5 22C15.5 22 16.5 21.0001 16.5 20.0013V12.9394C16.5 12.6968 16.6967 12.5001 16.9393 12.5001C17.3307 12.5001 17.5268 12.0268 17.25 11.7501L16.6464 11.1465C16.5527 11.0527 16.5 10.9256 16.5 10.7929Z"
        fill="#692AFA"
        stroke="white"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <path d="M9.5 6.75C9.5 6.5 10 6 10.5 6" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.5 6.75C15.5 6.5 15 6 14.5 6" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M15.5 9.48419V11C14.9 10.5 13.7 10.5 12.5 10.5C11.3 10.5 10.1 10.5 9.5 11V9.48402C9.5 9.33563 9.56419 9.19226 9.68937 9.11258C10.331 8.70419 11.4155 8.5 12.5 8.5C13.5845 8.5 14.669 8.70419 15.3106 9.11258C15.4358 9.19226 15.5 9.3358 15.5 9.48419Z"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 19.5158L9.5 18C10.1 18.5 11.3 18.5 12.5 18.5C13.7 18.5 14.9 18.5 15.5 18L15.5 19.516C15.5 19.6644 15.4358 19.8077 15.3106 19.8874C14.669 20.2958 13.5845 20.5 12.5 20.5C11.4155 20.5 10.331 20.2958 9.68937 19.8874C9.56419 19.8077 9.5 19.6642 9.5 19.5158Z"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.4511 5.2132C17.4583 4.77645 17.11 4.4282 16.6733 4.43539M18.423 4.87766C18.4361 4.08356 17.8029 3.45039 17.0088 3.46345M19.4366 4.57121C19.4562 3.38006 18.5064 2.43031 17.3153 2.44989"
        stroke="white"
        strokeWidth="0.5625"
        strokeLinecap="round"
      />
      <path
        d="M7.43952 5.2132C7.43234 4.77645 7.78058 4.4282 8.21734 4.43539M6.46759 4.87766C6.45453 4.08356 7.0877 3.45039 7.8818 3.46345M5.45403 4.57121C5.43444 3.38006 6.38419 2.43031 7.57535 2.44989"
        stroke="white"
        strokeWidth="0.5625"
        strokeLinecap="round"
      />
    </svg>
  );
  return <Icon component={Svg} {...props} />;
}
