import type { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { IntlProvider } from "react-intl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";
import type { Container } from "@/app/container";
import { ContainerProvider } from "@/shared/providers/ContainerProvider";
import { DialogsProvider } from "@/shared/providers/DialogsProvider";
import i18n from "@/tests/i18n";

export const AllTheProviders = ({
  children,
  container,
}: {
  children: ReactNode;
  container: Container;
}) => {
  const queryClient = new QueryClient();

  return (
    <PrimeReactProvider>
      <I18nextProvider i18n={i18n} defaultNS="translation">
        <ContainerProvider container={container}>
          <QueryClientProvider client={queryClient}>
            <IntlProvider locale="en">
              <DialogsProvider>{children}</DialogsProvider>
            </IntlProvider>
          </QueryClientProvider>
        </ContainerProvider>
      </I18nextProvider>
    </PrimeReactProvider>
  );
};
