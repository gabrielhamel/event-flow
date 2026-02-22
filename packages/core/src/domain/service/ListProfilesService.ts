import type { ProfileRepository } from "@repo/core/domain/repository/ProfileRepository";

export class ListProfileService {
  private readonly profileRepository: ProfileRepository;

  constructor(profileRepository: ProfileRepository) {
    this.profileRepository = profileRepository;
  }

  execute() {
    return this.profileRepository.list();
  }
}
