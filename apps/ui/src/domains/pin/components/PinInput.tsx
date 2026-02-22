import { Controller, useFormContext } from "react-hook-form";
import type { Pin } from "@repo/core/domain/valueObject/Pin";
import { InputOtp } from "primereact/inputotp";
import type z from "zod";

type NullablePin = z.infer<ReturnType<typeof Pin.schema.nullable>>;

export const PinInput = () => {
  const { control } = useFormContext<{ pin: NullablePin }>();

  const mapFieldValueToPin = (
    pin: string | number | null | undefined,
  ): NullablePin => {
    if (pin === null || pin === undefined) {
      return null;
    }

    const normalizedPin = pin.toString();
    if (!normalizedPin.length) {
      return null;
    }

    return normalizedPin;
  };

  return (
    <Controller
      name="pin"
      control={control}
      render={({ field }) => (
        <div data-testid="pin-input-container">
          <InputOtp
            value={field.value}
            onChange={(e) => field.onChange(mapFieldValueToPin(e.value))}
            integerOnly
          />
        </div>
      )}
    />
  );
};
