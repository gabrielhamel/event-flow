import { Profile } from "@repo/core/domain/entity/Profile";
import { CanChangeProfileService } from "@repo/core/domain/service/CanChangeProfileService";
import { CreateProfileService } from "@repo/core/domain/service/CreateProfileService";
import { ListProfileService } from "@repo/core/domain/service/ListProfilesService";
import { Id } from "@repo/core/domain/valueObject/Id";
import { NonEmptyString } from "@repo/core/domain/valueObject/NonEmptyString";
import { InMemoryProfileRepository } from "@repo/core/infrastructure/repository/InMemoryProfileRepository";

const profileRepository = new InMemoryProfileRepository([
  new Profile({
    id: Id.fromString("profile_01988f7a-3e5b-70c9-bab5-3e8817be5922"),
    name: NonEmptyString.create("Profile 1"),
    pin: null,
  }),
]);

export const appContainer = {
  service: {
    profile: {
      canChangeProfile: new CanChangeProfileService(),
      create: new CreateProfileService(profileRepository),
      list: new ListProfileService(profileRepository),
    },
  },
} as const;

export type Container = typeof appContainer;
