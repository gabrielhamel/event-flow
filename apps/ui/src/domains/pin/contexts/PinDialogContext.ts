import { createContext } from "react";
import type { Pin } from "@repo/core/domain/valueObject/Pin";

export type PinCallback = (success: boolean) => void;
export type PinValidate = (input: Pin) => boolean;

export interface OpenPinDialogParams {
  validator: PinValidate;
  callback: PinCallback;
}

export type OpenPinDialog = (params: OpenPinDialogParams) => void;

export const PinDialogContext = createContext<{
  openPinDialog: OpenPinDialog;
}>({
  openPinDialog: (params) => {
    void params;
  },
});
