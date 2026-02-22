import type { Profile } from "@repo/core/domain/entity/Profile";
import type { Pin } from "@repo/core/domain/valueObject/Pin";

export class CanChangeProfileService {
  execute({ profile, inputPin }: { profile: Profile; inputPin: Pin | null }) {
    if (!profile.pin) {
      return true;
    }

    if (!inputPin) {
      return false;
    }

    return inputPin.equals(profile.pin);
  }
}
