import { useState } from "react";
import type {
  CreateProfileDialog,
  CreateProfileDialogParams,
  CreateProfileSuccessCallback,
} from "@/domains/profiles/create/contexts/CreateProfileDialogContext";

export const useCreateProfileDialog = () => {
  const [openCreateProfileDialogParams, setOpenCreateProfileDialogParams] =
    useState<CreateProfileDialogParams | null>(null);

  const isCreateProfileDialogVisible = Boolean(openCreateProfileDialogParams);

  const openCreateProfileDialog: CreateProfileDialog = (params) => {
    setOpenCreateProfileDialogParams(params);
  };

  const closeCreateProfileDialog = () => {
    setOpenCreateProfileDialogParams(null);
  };

  const submitCreateProfile: CreateProfileSuccessCallback = (data) => {
    openCreateProfileDialogParams?.onSuccess(data);
    setOpenCreateProfileDialogParams(null);
  };

  return {
    closeCreateProfileDialog,
    isCreateProfileDialogVisible,
    openCreateProfileDialog,
    submitCreateProfile,
  };
};
