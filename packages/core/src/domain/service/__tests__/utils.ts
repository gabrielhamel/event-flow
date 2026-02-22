import { Profile } from "@repo/core/domain/entity/Profile";
import { Id } from "@repo/core/domain/valueObject/Id";
import { NonEmptyString } from "@repo/core/domain/valueObject/NonEmptyString";
import { Pin } from "@repo/core/domain/valueObject/Pin";

export const createFixtureProfile = (name: string, pin: string | null = null) =>
  new Profile({
    id: Id.create("profile"),
    name: NonEmptyString.create(name),
    pin: pin === null ? null : Pin.create(pin),
  });
