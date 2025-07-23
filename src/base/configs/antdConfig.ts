import { FormProps, InputNumberProps, ThemeConfig } from 'antd';

export const getCSSVariable = (variable: string): number | false => {
  if (typeof window !== 'undefined') {
    const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    return value.endsWith('px') ? Number(value.replace('px', '')) : Number(value);
  }
  return false;
};
export function getMaxLength(n: number) {
  if (n < 4) return n;
  const group = Math.floor((n - 4) / 3);
  const bonus = group + 1;
  return n + bonus;
}
export const moneyFormatter = (value: any) => value && value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
export const moneyInputConfig: InputNumberProps = {
  formatter: moneyFormatter,
  parser: (value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number,
  controls: false,
  maxLength: getMaxLength(11),
  onKeyPress: (e) => {
    const input = e.target as HTMLInputElement;
    const value = input.value.replace(/,/g, '');
    if (value === '0' && e.key === '0') {
      e.preventDefault();
    }
    if (e.key === '-' || /[^0-9]/.test(e.key)) {
      e.preventDefault();
    }
  }
  // This onKeyPress to allow only input number, prevent input character
  // Override it in your code when using Input Component, don't remove it
};
// handle keydown muon chan so thuwc
export const preventDecimalKeyInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const invalidKeys = ['.', 'e', '+', '-', ',', ' '];

  if (invalidKeys.includes(e.key) || (e.key.length === 1 && !e.key.match(/[0-9]/))) {
    e.preventDefault();
  }
};
// chan tieng viet tieng han
export const preventNonNumericInput = (e: React.FormEvent<HTMLInputElement>) => {
  const input = (e.nativeEvent as InputEvent).data;
  if (input && !/^\d+$/.test(input)) {
    e.preventDefault();
  }
};
export const mainLayoutAntdConfig: ThemeConfig = {
  token: {
    fontFamily: "'Pretendard', sans-serif",
    colorTextPlaceholder: '#475069',
    colorError: '#FF7D7D',
    borderRadius: 4,
    lineHeight: 1,
    screenXS: getCSSVariable('--screen-xs') || 0,
    screenXSMin: getCSSVariable('--screen-xs-min') || 0,
    screenXSMax: getCSSVariable('--screen-xs-max') || 575,

    screenSM: getCSSVariable('--screen-sm') || 576,
    screenSMMin: getCSSVariable('--screen-sm-min') || 576,
    screenSMMax: getCSSVariable('--screen-sm-max') || 767,

    screenMD: getCSSVariable('--screen-md') || 768,
    screenMDMin: getCSSVariable('--screen-md-min') || 768,
    screenMDMax: getCSSVariable('--screen-md-max') || 1199,

    screenLG: getCSSVariable('--screen-lg') || 1200,
    screenLGMin: getCSSVariable('--screen-lg-min') || 1200,
    screenLGMax: getCSSVariable('--screen-lg-max') || 1439,

    // Additional screens
    screenXL: getCSSVariable('--screen-xl') || 1440,
    screenXLMin: getCSSVariable('--screen-xl-min') || 1440,
    screenXLMax: getCSSVariable('--screen-xl-max') || 1919,

    screenXXL: getCSSVariable('--screen-xxl') || 1920,
    screenXXLMin: getCSSVariable('--screen-xxl-min') || 1920
  },
  components: {
    Layout: {
      bodyBg: '#ffffff'
    },
    Button: {
      paddingBlockLG: 17,
      paddingInlineLG: 28,
      paddingInline: 10,
      borderRadius: 4
    },
    Typography: {
      colorTextDescription: '#475069',
      colorTextSecondary: '#475069',
      titleMarginBottom: 0,
      colorText: 'background: var(--base-fg-color-base-fg-80, #1E253B)'
    },
    Form: {
      labelColor: '#475069',
      labelRequiredMarkColor: 'red',
      itemMarginBottom: 0,
      labelColonMarginInlineEnd: 16,
      verticalLabelMargin: 0,
      verticalLabelPadding: 2,
      labelHeight: 28,
      controlHeight: 28,
      controlHeightSM: 20
    },
    Tabs: {
      margin: 0,
      itemColor: '#989898'
    },
    Checkbox: {
      colorPrimary: 'var(--check-box-bg-selcted, #692afa)',
      colorPrimaryHover: 'var(--button-primary-bg-hoverd, #4338ca)',
      colorBorder: 'var(--check-box-stroke-enabled, #CBD1E1)',
      colorTextDisabled: 'var(--base-fg-color-base-fg-50, #646E8B)',
      colorBgContainerDisabled: 'var(--check-box-bg-disabled, #E2E5F0)'
    },
    Divider: {
      colorSplit: '#E2E5F0'
    },
    Radio: {
      dotSize: 6,
      radioSize: 16,
      colorTextDisabled: 'var(--base-fg-color-base-fg-50, #646E8B)',
      wrapperMarginInlineEnd: 16
    },
    Select: {
      controlHeightSM: 28,
      controlHeight: 36,
      colorBorder: '#CBD1E1',
      activeBorderColor: '#CBD1E1',
      boxShadowSecondary: 'none',
      boxShadow: 'none',
      fontSizeSM: 12,
      controlPaddingHorizontalSM: 12,
      optionSelectedBg: '#F1F3F9'
    },
    Modal: { borderRadius: 8 },
    Input: {
      colorTextDisabled: '#000',
      activeBg: 'var(--input-bg-selected, #FFFFFF)',
      activeBorderColor: 'var(--input-stroke-selected, #692afa) ',
      activeShadow: 'none',
      hoverBg: 'var(--input-bg-hovered, #F1F3F9)',
      hoverBorderColor: 'var(--input-stroke-hovered, #646E8B)',
      colorText: '#475069',
      inputFontSize: 12,
      inputFontSizeSM: 12,
      borderRadius: 4,
      controlHeightSM: 28,
      controlHeight: 36,
      paddingBlockSM: 4,
      paddingBlock: 8,
      paddingInlineSM: 8,
      paddingInline: 12,
      lineHeightLG: 1,
      lineHeight: 1.5,
      colorBorder: '#CBD1E1'
    },
    InputNumber: {
      colorTextDisabled: '#000',
      activeBg: 'var(--input-bg-selected, #FFFFFF)',
      activeBorderColor: 'var(--input-stroke-selected, #692afa) ',
      activeShadow: 'none',
      hoverBg: 'var(--input-bg-hovered, #F1F3F9)',
      hoverBorderColor: 'var(--input-stroke-hovered, #646E8B)',
      colorText: '#475069',
      inputFontSize: 12,
      inputFontSizeSM: 12,
      borderRadius: 4,
      controlHeightSM: 28,
      controlHeight: 36,
      paddingBlockSM: 4,
      paddingBlock: 8,
      paddingInlineSM: 8,
      paddingInline: 12,
      lineHeightLG: 1,
      lineHeight: 1.5,
      colorBorder: '#CBD1E1'
    },
    Table: {
      fontSize: 16,
      cellFontSize: 16
    },
    Switch: {
      handleBg: '#fff',
      handleSize: 16,
      innerMaxMargin: 20,
      trackHeight: 20,
      trackMinWidth: 38,
      handleShadow: 'red'
    },
    DatePicker: {
      colorBorder: 'var(--check-box-stroke-enabled, #CBD1E1)',
      paddingInline: 8,
      paddingBlock: 2,
      controlHeightSM: 20,
      controlHeight: 36,
      lineHeight: 1.5,
      colorText: '#475069'
    },
    Menu: { iconSize: 20 }
  }
};
export const formConfig: FormProps = {
  scrollToFirstError: {
    behavior: 'smooth',
    block: 'center',
    inline: 'center'
  },
  // onFinishFailed: () => message.error('로그인하기', 3),
  requiredMark: false,
  labelAlign: 'left'
};
