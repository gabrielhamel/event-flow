import { FormProvider } from "react-hook-form";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { PinInput } from "@/domains/pin";
import { NameInput } from "@/domains/profiles/create/components/NameInput";
import type { CreateProfileSuccessCallback } from "@/domains/profiles/create/contexts/CreateProfileDialogContext";
import { useCreateProfileForm } from "@/domains/profiles/create/hooks/useCreateProfileForm";
import { FormField } from "@/shared/components/molecules/FormField";
import { useTranslation } from "@/shared/hooks/useTranslation";

export const CreateProfileDialog = ({
  visible,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  onSubmit: CreateProfileSuccessCallback;
  onClose: () => void;
}) => {
  const { t } = useTranslation();

  const { onSubmitForm, formMethods, resetForm } = useCreateProfileForm({
    onSubmit,
  });

  const handleOnHide = () => {
    resetForm();
    onClose();
  };

  return (
    <FormProvider {...formMethods}>
      <Dialog
        visible={visible}
        onHide={handleOnHide}
        header={t("profile.action.create")}
        className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3"
        resizable={false}
        draggable={false}
        closeOnEscape={true}
        dismissableMask={true}
        footer={() => (
          <form onSubmit={onSubmitForm}>
            <Button
              size="small"
              label={t("action.create")}
              disabled={!formMethods.formState.isValid}
              type="submit"
            />
          </form>
        )}
      >
        <div className="flex flex-col gap-4">
          <FormField label={t("profile.field.name")}>
            <NameInput />
          </FormField>
          <FormField
            label={`${t("profile.field.pin")} (${t("form.optional")})`}
          >
            <PinInput />
          </FormField>
        </div>
      </Dialog>
    </FormProvider>
  );
};
