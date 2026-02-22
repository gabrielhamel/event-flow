import { createElement, type ReactElement } from "react";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { render, type RenderOptions } from "@testing-library/react";
import type { Container } from "@/app/container";
import { AllTheProviders } from "@/tests/AllTheProviders";

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

const customRender = (
  ui: ReactElement,
  container: DeepPartial<Container> = {},
  options: Omit<RenderOptions, "wrapper"> | undefined = undefined,
) =>
  render(ui, {
    wrapper: ({ children }) =>
      createElement(
        AllTheProviders,
        {
          container,
        } as Parameters<typeof AllTheProviders>[0],
        children,
      ),
    ...options,
  });

// eslint-disable-next-line @typescript-eslint/no-restricted-imports
export * from "@testing-library/react";
export { customRender as render };
