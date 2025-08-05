export const LANGUAGE_OPTIONS = [
  { value: "en", label: "English (United States)" },
  { value: "vi", label: "Vietnamese (Vietnam)" },
  // { value: "fr", label: "French (France)" },
  // { value: "es", label: "Spanish (Spain)" },
  { value: "ja", label: "Japanese (Japan)" },
  { value: "ko", label: "Korean (South Korea)" },
  { value: "zh", label: "Chinese (China)" },
  // { value: "zh-TW", label: "Chinese (Traditional, Taiwan)" },
  // { value: "de", label: "German (Germany)" },
  { value: "auto", label: "Auto select" },
];

export const VALID_LANGUAGES = LANGUAGE_OPTIONS.map((lang) => lang.value);
