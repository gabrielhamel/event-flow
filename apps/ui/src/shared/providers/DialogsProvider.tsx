import type { ReactNode } from "react";
import { PinDialogProvider } from "@/domains/pin/providers/PinDialogProvider";
import { CreateProfileDialogProvider } from "@/domains/profiles/create/providers/CreateProfileDialogProvider";

export const DialogsProvider = ({ children }: { children: ReactNode }) => (
  <>
    <CreateProfileDialogProvider>
      <PinDialogProvider>{children}</PinDialogProvider>
    </CreateProfileDialogProvider>
  </>
);
