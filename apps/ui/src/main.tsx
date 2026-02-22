import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { IntlProvider } from "react-intl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18n from "i18next";
import { PrimeReactProvider } from "primereact/api";
import { appContainer } from "@/app/container";
import { getBrowserLocale } from "@/shared/locales/getBrowserLocale";
import { defaultNamespace } from "@/shared/locales/i18n";
import { ContainerProvider } from "@/shared/providers/ContainerProvider";
import { DialogsProvider } from "@/shared/providers/DialogsProvider";
import { App } from "./app/App";
import "./global.css";

const locale = getBrowserLocale();
const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <I18nextProvider i18n={i18n} defaultNS={defaultNamespace}>
        <ContainerProvider container={appContainer}>
          <QueryClientProvider client={queryClient}>
            <IntlProvider locale={locale}>
              <DialogsProvider>
                <App />
              </DialogsProvider>
            </IntlProvider>
          </QueryClientProvider>
        </ContainerProvider>
      </I18nextProvider>
    </PrimeReactProvider>
  </StrictMode>,
);
