import { useContext } from "react";
import { CreateProfileDialogContext } from "@/domains/profiles/create/contexts/CreateProfileDialogContext";

export const useCreateProfile = () => {
  const { openCreateProfileDialog } = useContext(CreateProfileDialogContext);

  return { openCreateProfileForm: openCreateProfileDialog };
};
