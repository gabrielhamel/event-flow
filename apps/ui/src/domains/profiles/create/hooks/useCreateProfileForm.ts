import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NonEmptyString } from "@repo/core/domain/valueObject/NonEmptyString";
import { Pin } from "@repo/core/domain/valueObject/Pin";
import z from "zod";

interface SubmittedValues {
  name: NonEmptyString;
  pin: Pin | null;
}

const formSchema = z.object({
  name: NonEmptyString.schema,
  pin: Pin.schema.nullable(),
});

type FormSchema = z.infer<typeof formSchema>;

export const useCreateProfileForm = ({
  onSubmit,
}: {
  onSubmit: (data: SubmittedValues) => void;
}) => {
  const formMethods = useForm({
    defaultValues: {
      name: "",
      pin: null,
    },
    mode: "all",
    resolver: zodResolver(formSchema),
  });

  const resetForm = () => {
    formMethods.reset();
  };

  const onSubmitForm = (data: FormSchema) => {
    onSubmit({
      name: NonEmptyString.create(data.name),
      pin: data.pin === null ? null : Pin.create(data.pin),
    });
    resetForm();
  };

  const handleOnSubmit = formMethods.handleSubmit(onSubmitForm);

  return {
    formMethods,
    onSubmitForm: handleOnSubmit,
    resetForm,
  };
};
