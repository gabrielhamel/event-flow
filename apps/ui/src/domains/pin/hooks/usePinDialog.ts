import { useState } from "react";
import type {
  OpenPinDialog,
  OpenPinDialogParams,
} from "@/domains/pin/contexts/PinDialogContext";

export const usePinDialog = () => {
  const [openPinDialogParams, setOpenPinDialogParams] =
    useState<OpenPinDialogParams | null>(null);

  const isPinDialogVisible = Boolean(openPinDialogParams);

  const openPinDialog: OpenPinDialog = (params) => {
    setOpenPinDialogParams(params);
  };

  const closePinDialog = (success: boolean) => {
    openPinDialogParams?.callback(success);
    setOpenPinDialogParams(null);
  };

  const pinValidator = openPinDialogParams?.validator ?? (() => true);

  return {
    closePinDialog,
    isPinDialogVisible,
    openPinDialog,
    pinValidator,
  };
};
