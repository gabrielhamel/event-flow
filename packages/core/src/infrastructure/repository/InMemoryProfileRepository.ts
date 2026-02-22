import type { Profile } from "@repo/core/domain/entity/Profile";
import type { ProfileRepository } from "@repo/core/domain/repository/ProfileRepository";
import type { Id } from "@repo/core/domain/valueObject/Id";

export class InMemoryProfileRepository implements ProfileRepository {
  private readonly profiles;

  constructor(defaultValues: Profile[] = []) {
    this.profiles = defaultValues;
  }

  get(id: Id) {
    const result = this.profiles.find((p) => p.id.equals(id));
    if (!result) {
      throw new Error(`Could not find profile with id ${id.toString()}`);
    }

    return Promise.resolve(result);
  }

  list() {
    return Promise.resolve(this.profiles);
  }

  save(profile: Profile) {
    this.profiles.push(profile);

    return Promise.resolve();
  }
}
