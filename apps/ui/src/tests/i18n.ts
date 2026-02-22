import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import en from "@/shared/locales/en";

void i18n.use(initReactI18next).init({
  debug: false,
  fallbackLng: "en",
  resources: {
    en: {
      translation: en,
    },
  },
});

export default i18n;
