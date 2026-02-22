import type { ReactNode } from "react";
import { PinDialog } from "@/domains/pin/components/PinDialog";
import { PinDialogContext } from "@/domains/pin/contexts/PinDialogContext";
import { usePinDialog } from "@/domains/pin/hooks/usePinDialog";

export const PinDialogProvider = ({ children }: { children: ReactNode }) => {
  const { isPinDialogVisible, openPinDialog, closePinDialog, pinValidator } =
    usePinDialog();

  return (
    <PinDialogContext.Provider
      value={{
        openPinDialog,
      }}
    >
      {children}
      <PinDialog
        visible={isPinDialogVisible}
        onClose={closePinDialog}
        validate={pinValidator}
      />
      )
    </PinDialogContext.Provider>
  );
};
