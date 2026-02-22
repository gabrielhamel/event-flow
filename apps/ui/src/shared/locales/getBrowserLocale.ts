import LanguageDetector from "i18next-browser-languagedetector";

export const getBrowserLocale = () => {
  const fallbackLocale = "en";

  return new LanguageDetector().detect()?.toString() ?? fallbackLocale;
};
