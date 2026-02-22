import type { ReactNode } from "react";
import { CreateProfileDialog } from "@/domains/profiles/create/components/CreateProfileDialog";
import { CreateProfileDialogContext } from "@/domains/profiles/create/contexts/CreateProfileDialogContext";
import { useCreateProfileDialog } from "@/domains/profiles/create/hooks/useCreateProfileDialog";

export const CreateProfileDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const {
    isCreateProfileDialogVisible,
    openCreateProfileDialog,
    closeCreateProfileDialog,
    submitCreateProfile,
  } = useCreateProfileDialog();

  return (
    <CreateProfileDialogContext.Provider
      value={{
        openCreateProfileDialog,
      }}
    >
      {children}
      <CreateProfileDialog
        visible={isCreateProfileDialogVisible}
        onClose={closeCreateProfileDialog}
        onSubmit={submitCreateProfile}
      />
      )
    </CreateProfileDialogContext.Provider>
  );
};
