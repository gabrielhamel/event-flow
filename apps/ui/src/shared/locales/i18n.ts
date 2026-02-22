import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import en from "@/shared/locales/en";
import fr from "@/shared/locales/fr";
import { getBrowserLocale } from "@/shared/locales/getBrowserLocale";

export const defaultNamespace = "translation" as const;

export type TranslationKeys = typeof fr & typeof en;

type TranslationLang = Record<
  string,
  {
    [defaultNamespace]: TranslationKeys;
  }
>;

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
} satisfies TranslationLang;

void i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: getBrowserLocale(),
  resources,
});

export default i18n;
