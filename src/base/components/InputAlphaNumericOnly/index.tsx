import { Input, InputProps } from 'antd';
import React, { useRef, useState, useEffect } from 'react';

export interface InputAlphaNumericOnlyProps extends InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allowedChars?: RegExp;
}

const hasKorean = (text: string) => /[\u3131-\uD79D]/giu.test(text);

const BaseInput = ({ value = '', onChange, type = 'text', allowedChars, ...props }: InputAlphaNumericOnlyProps) => {
  const isComposing = useRef(false);
  const [inputValue, setInputValue] = useState(String(value ?? ''));

  const defaultRegex = /[a-zA-Z0-9,./;'[\]\-=_+`~!@#$%^&*(){}:"<>?|]/g;

  const clean = (val: string) => {
    const matched = val.match(allowedChars ?? defaultRegex) || [];
    return matched.join('');
  };

  useEffect(() => {
    if (!isComposing.current) {
      setInputValue(String(value ?? ''));
    }
  }, [value]);

  const triggerChange = (e: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
    const event = {
      ...e,
      target: {
        ...e.target,
        value: newValue
      }
    };
    onChange?.(event as React.ChangeEvent<HTMLInputElement>);
  };

  const handleCompositionStart = () => {
    isComposing.current = true;
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    isComposing.current = false;
    const raw = e.currentTarget.value;

    if (hasKorean(raw)) {
      return;
    }

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

    if (hasKorean(rawValue)) {
      return;
    }

    const cleaned = clean(rawValue);
    setInputValue(cleaned);
    triggerChange(e, cleaned);
  };

  const InputComponent = type === 'password' ? Input.Password : Input;

  return (
    <InputComponent
      {...props}
      type={type}
      value={inputValue}
      onChange={handleChange}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onKeyDown={handleKeyDown}
      inputMode="text"
    />
  );
};

const InputAlphaNumericOnly = (props: InputAlphaNumericOnlyProps) => {
  return <BaseInput {...props} />;
};

InputAlphaNumericOnly.Password = (props: InputAlphaNumericOnlyProps) => {
  return <BaseInput {...props} type="password" />;
};

export default InputAlphaNumericOnly;
