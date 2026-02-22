import { createContext } from "react";
import type { NonEmptyString } from "@repo/core/domain/valueObject/NonEmptyString";
import type { Pin } from "@repo/core/domain/valueObject/Pin";

export type CreateProfileSuccessCallback = (data: {
  name: NonEmptyString;
  pin: Pin | null;
}) => void;

export interface CreateProfileDialogParams {
  onSuccess: CreateProfileSuccessCallback;
}

export type CreateProfileDialog = (params: CreateProfileDialogParams) => void;

export const CreateProfileDialogContext = createContext<{
  openCreateProfileDialog: CreateProfileDialog;
}>({
  openCreateProfileDialog: (params) => {
    void params;
  },
});
