import { Input, InputProps } from 'antd';
import React, { useRef, useState, useEffect } from 'react';

export interface InputOnlyAlphaNumericProps extends InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const hasKorean = (text: string) => /[\u3131-\uD79D]/giu.test(text);

const cleanNumberAlpha = (val: string) => val.replace(/[^a-zA-Z0-9-]/g, '');
const cleanEmail = (val: string) => val.replace(/[^a-zA-Z0-9.]/g, '');
const cleanEmail1 = (val: string) => val.replace(/[^a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]/g, '');

const BaseInput = ({ value = '', onChange, type = 'text', ...props }: InputOnlyAlphaNumericProps) => {
  const isComposing = useRef(false);
  const [inputValue, setInputValue] = useState(String(value ?? ''));
  let clean = cleanNumberAlpha;

  if (type === 'email') {
    clean = cleanEmail;
    type = 'text';
  } else if (type === 'email1') {
    clean = cleanEmail1;
    type = 'text';
  }

  useEffect(() => {
    if (!isComposing.current) {
      setInputValue(String(value ?? ''));
    }
  }, [value]);

  const triggerChange = (e: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
    const event = {
      ...e,
      target: { ...e.target, value: newValue }
    };
    onChange?.(event as React.ChangeEvent<HTMLInputElement>);
  };

  const handleCompositionStart = () => {
    isComposing.current = true;
  };

  const handleBlur = (e: any) => {
    if (isComposing.current) {
      isComposing.current = false;
      handleChange(e);
    }
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    isComposing.current = false;
    const raw = e.currentTarget.value;

    if (hasKorean(raw)) return;

    const cleaned = clean(raw);
    setInputValue(cleaned);

    const fakeEvent = {
      ...e,
      target: {
        ...e.currentTarget,
        value: cleaned
      }
    };

    onChange?.(fakeEvent as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['Backspace', 'Delete'].includes(e.key)) {
      isComposing.current = false;
      return;
    }

    if (isComposing.current && e.key.length === 1 && /^[a-zA-Z0-9]$/.test(e.key)) {
      isComposing.current = false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isComposing.current) return;

    const rawValue = e.target.value;

    const cleaned = clean(rawValue);
    setInputValue(cleaned);
    triggerChange(e, cleaned);
  };

  return (
    <Input
      {...props}
      type={type}
      value={inputValue}
      onChange={handleChange}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onKeyDown={handleKeyDown}
      inputMode="text"
      onBlur={handleBlur}
    />
  );
};

const InputOnlyAlphaNumeric = (props: InputOnlyAlphaNumericProps) => {
  return <BaseInput {...props} />;
};

InputOnlyAlphaNumeric.Password = (props: InputOnlyAlphaNumericProps) => {
  return <BaseInput {...props} type="password" />;
};

export default InputOnlyAlphaNumeric;
