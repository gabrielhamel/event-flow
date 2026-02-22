import { Profile } from "@repo/core/domain/entity/Profile";
import type { ProfileRepository } from "@repo/core/domain/repository/ProfileRepository";
import { Id } from "@repo/core/domain/valueObject/Id";
import type { NonEmptyString } from "@repo/core/domain/valueObject/NonEmptyString";
import type { Pin } from "@repo/core/domain/valueObject/Pin";

export class CreateProfileService {
  private readonly profileRepository: ProfileRepository;

  constructor(profileRepository: ProfileRepository) {
    this.profileRepository = profileRepository;
  }

  async execute({ name, pin }: { name: NonEmptyString; pin: Pin | null }) {
    const id = Id.create("profile");
    const profile = new Profile({
      id,
      name,
      pin,
    });

    await this.profileRepository.save(profile);

    return profile;
  }
}
