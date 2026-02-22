import type { Id } from "@repo/core/domain/valueObject/Id";
import type { NonEmptyString } from "@repo/core/domain/valueObject/NonEmptyString";
import type { Pin } from "@repo/core/domain/valueObject/Pin";

export class Profile {
  id: Id;
  name: NonEmptyString;
  pin: Pin | null;

  constructor(props: { id: Id; name: NonEmptyString; pin: Pin | null }) {
    this.id = props.id;
    this.name = props.name;
    this.pin = props.pin;
  }

  hasPin() {
    return Boolean(this.pin);
  }
}
