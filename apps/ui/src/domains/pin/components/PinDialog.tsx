import { FormProvider } from "react-hook-form";
import type { Pin } from "@repo/core/domain/valueObject/Pin";
import { Dialog } from "primereact/dialog";
import { PinInput } from "@/domains/pin/components/PinInput";
import { usePinForm } from "@/domains/pin/hooks/usePinForm";
import { useTranslation } from "@/shared/hooks/useTranslation";

export const PinDialog = ({
  visible,
  onClose,
  validate,
}: {
  visible: boolean;
  onClose: (success: boolean) => void;
  validate: (input: Pin) => boolean;
}) => {
  const { t } = useTranslation();

  const { formMethods, resetForm } = usePinForm({
    onSubmit: (data) => validate(data.pin),
    onSuccess: () => {
      onClose(true);
    },
  });

  const handleOnHide = () => {
    resetForm();
    onClose(false);
  };

  return (
    <FormProvider {...formMethods}>
      <Dialog
        visible={visible}
        onHide={handleOnHide}
        header={t("pin.action.input")}
        className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3"
        resizable={false}
        draggable={false}
        closeOnEscape={true}
        dismissableMask={true}
      >
        <div className="flex justify-center">
          <PinInput />
        </div>
      </Dialog>
    </FormProvider>
  );
};
