import { useContext } from "react";
import { PinDialogContext } from "@/domains/pin/contexts/PinDialogContext";

export const usePromptPin = () => {
  const { openPinDialog } = useContext(PinDialogContext);

  return { promptPin: openPinDialog };
};
