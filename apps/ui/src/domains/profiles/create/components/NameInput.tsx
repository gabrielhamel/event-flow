import { useFormContext } from "react-hook-form";
import type { NonEmptyString } from "@repo/core/domain/valueObject/NonEmptyString";
import { InputText } from "primereact/inputtext";
import type z from "zod";

type Name = z.infer<typeof NonEmptyString.schema>;

export const NameInput = () => {
  const { register } = useFormContext<{
    name: Name;
  }>();

  return (
    <InputText
      {...register("name")}
      placeholder="Johann Sebastian Bach"
      data-testid="name-input"
    />
  );
};
