import { useEffect, useState } from 'react';
import { Flex, Input } from 'antd';
import Button from '../Button/CustomButton';
import CustomSelect from '../CustomSelect/CustomSelect';
// import { filterAllowedCharacters } from '@/base/hooks/inputHooks/useOnlyKoreanInput';
// import InputAlphaNumericOnly from '../InputAlphaNumericOnly';
import InputOnlyAlphaNumeric from '../InputOnlyAlphaNumeric';
import IconPlus from '@/base/icons/IconPlus';
import IconX from '@/base/icons/XIcon';

const emailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'daum.net', 'naver.com'];

interface DynamicEmailFormProps {
  value: string[] | string;
  onChange?: (value: string[]) => void;
  showActionButton?: boolean;
  inputStyle?: React.CSSProperties;
  selectStyle?: React.CSSProperties;
  suffix?: React.ReactNode;
  disabled?: boolean;
}

export const DynamicEmailForm = ({
  value,
  onChange = () => {},
  showActionButton = false,
  inputStyle,
  selectStyle,
  suffix,
  disabled
}: DynamicEmailFormProps) => {
  const emailList = Array.isArray(value) && value.length > 0 ? value : [''];

  const handleChange = (index: number, key: 'emailName' | 'emailAlternative', newValue: string) => {
    const newEmails = emailList.map((email, i) => {
      if (i === index) {
        const [emailName = '', emailAlternative = ''] = email.split('@');
        const updatedName = key === 'emailName' ? newValue : emailName;
        const updatedAlt = key === 'emailAlternative' ? newValue : emailAlternative;
        if (!updatedName && !updatedAlt) return '';

        return `${updatedName}@${updatedAlt}`;
      }
      return email;
    });
    onChange(newEmails);
  };

  const handleAddRow = () => {
    onChange([...emailList, '']);
  };

  const handleRemoveRow = (index: number) => {
    const newEmails = emailList.filter((_, i) => i !== index);
    onChange(newEmails);
  };

  return (
    <Flex vertical gap={10}>
      {emailList.map((email, index) => (
        <EmailRowItem
          key={index}
          value={email}
          index={index}
          handleChange={handleChange}
          handleAddRow={handleAddRow}
          handleRemoveRow={handleRemoveRow}
          showActionButton={showActionButton}
          inputStyle={inputStyle}
          selectStyle={selectStyle}
          suffix={suffix}
          isLast={index === emailList.length - 1}
          disabled={disabled}
        />
      ))}
    </Flex>
  );
};

interface EmailRowItemProps {
  value: string;
  index: number;
  handleChange: (index: number, key: 'emailName' | 'emailAlternative', newValue: string) => void;
  handleAddRow: () => void;
  handleRemoveRow: (index: number) => void;
  showActionButton?: boolean;
  inputStyle?: React.CSSProperties;
  selectStyle?: React.CSSProperties;
  suffix?: React.ReactNode;
  isLast: boolean;
  maxLength?: number;
  disabled?: boolean;
}

const EmailRowItem = ({
  value,
  index,
  handleChange,
  handleAddRow,
  handleRemoveRow,
  showActionButton = false,
  inputStyle,
  selectStyle,
  suffix = null,
  isLast,
  maxLength = 30,
  disabled
}: EmailRowItemProps) => {
  const [emailName, emailAlternative] = value?.split('@');
  const [alternativeSelect, setAlternativeSelect] = useState('');

  useEffect(() => {
    if (emailAlternative && emailDomains.includes(emailAlternative)) {
      setAlternativeSelect(emailAlternative);
    } else if (emailAlternative) {
      setAlternativeSelect('custom');
    } else {
      // setAlternativeSelect('');
    }
  }, [value]);

  const handleChangeSelect = (newValue: string) => {
    setAlternativeSelect(newValue);
    handleChange(index, 'emailAlternative', newValue === 'custom' ? '' : newValue);
  };

  const handleInputChange = (key: 'emailName' | 'emailAlternative', e: any) => {
  const raw = e.target.value;
  // Nếu không cần lọc gì nữa:
  handleChange(index, key, raw);
};

  return (
    <Flex gap={8} align="center">
      <InputOnlyAlphaNumeric
        style={{ maxWidth: '100%', ...inputStyle }}
        maxLength={maxLength}
        value={emailName || ''}
        placeholder="Email name"
        type="email1"
        onChange={(e: any) => handleInputChange('emailName', e)}
        disabled={disabled}
      />
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>@</span>

      {/* {!alternativeSelect && (
        <>
          <Input
            style={{ maxWidth: '100%', ...inputStyle }}
            maxLength={50}
            value={emailAlternative || ''}
            placeholder="도메인 직접 입력"
            list={`email-domains-${index}`}
            onChange={(e) => handleChange(index, 'emailAlternative', e.target.value)}
          />
          <datalist id={`email-domains-${index}`}>
            {emailDomains.map((domain) => (
              <option key={domain} value={domain} />
            ))}
          </datalist>
        </>
      )} */}
      {/* {alternativeSelect && <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>@</span>} */}
      <CustomSelect
        style={{ minWidth: 110, ...selectStyle }}
        value={alternativeSelect || undefined}
        onChange={handleChangeSelect}
        placeholder="Domain"
        options={[...emailDomains.map((domain) => ({ label: domain, value: domain })), { value: 'custom', label: 'Custom' }]}
        disabled={disabled}
      />
      {alternativeSelect === 'custom' && (
        <InputOnlyAlphaNumeric
          type="email"
          style={{ maxWidth: '100%', ...inputStyle }}
          maxLength={maxLength}
          value={emailAlternative || ''}
          placeholder="Please enter your email address"
          onChange={(e: any) => handleInputChange('emailAlternative', e)}
        />
      )}

      {showActionButton && (
        <Button
          style={{ height: 28, width: 24, padding: 0 }}
          color="secondary"
          type="text"
          icon={isLast ? <IconPlus /> : <IconX />}
          onClick={isLast ? handleAddRow : () => handleRemoveRow(index)}
        />
      )}
      {alternativeSelect === '' && suffix && <div>{suffix}</div>}
    </Flex>
  );
};

// Validator trim trước khi kiểm tra
export const dynamicEmailValidator = (_: any, values: string[]) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const allowedSpecialChars = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~@.-]+$/;

  if (values?.length > 0 && values.every((val) => emailRegex.test(val.trim()) && allowedSpecialChars.test(val.trim()))) {
    return Promise.resolve();
  }

  return Promise.reject(new Error('Invalid email format or contains disallowed characters.'));
};
