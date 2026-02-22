import type { Profile } from "@repo/core/domain/entity/Profile";
import type { Id } from "@repo/core/domain/valueObject/Id";

export interface ProfileRepository {
  get: (id: Id) => Promise<Profile>;
  list: () => Promise<Profile[]>;
  save: (profile: Profile) => Promise<void>;
}
