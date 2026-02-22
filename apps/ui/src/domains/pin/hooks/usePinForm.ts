import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pin } from "@repo/core/domain/valueObject/Pin";
import z from "zod";

interface SubmittedValues {
  pin: Pin;
}

const formSchema = z.object({
  pin: Pin.schema,
});

export const usePinForm = ({
  onSubmit,
  onSuccess,
}: {
  onSuccess: () => void;
  onSubmit: (data: SubmittedValues) => boolean;
}) => {
  const formMethods = useForm({
    defaultValues: {
      pin: "",
    },
    mode: "all",
    resolver: zodResolver(formSchema),
  });

  const inputPin = formMethods.watch("pin");

  const resetForm = useCallback(() => {
    formMethods.reset();
  }, [formMethods]);

  useEffect(() => {
    try {
      const testPin = Pin.create(inputPin);
      if (onSubmit({ pin: testPin })) {
        onSuccess();
        resetForm();
      }
    } catch (e) {
      void e;
    }
  }, [inputPin, onSubmit, onSuccess, resetForm]);

  return { formMethods, resetForm };
};
