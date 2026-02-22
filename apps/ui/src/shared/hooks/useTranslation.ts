// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useTranslation as useOriginalTranslation } from "react-i18next";
import type { TranslationKeys } from "@/shared/locales/i18n";

type Join<K, P> = K extends string
  ? P extends string
    ? `${K}.${P}`
    : never
  : never;

export type LeafPaths<T, Depth extends number = 5> = [Depth] extends [never]
  ? never
  : T extends string
    ? ""
    : {
        [K in keyof T & string]: T[K] extends string
          ? `${K}`
          : Join<K, LeafPaths<T[K], Prev[Depth]>>;
      }[keyof T & string];
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

type FlattenTranslationKeys = LeafPaths<TranslationKeys>;

export const useTranslation = () => {
  const originalHook = useOriginalTranslation();

  const t = (key: FlattenTranslationKeys) => originalHook.t(key);

  return { t };
};
