import { createFixtureProfile } from "@repo/core/domain/service/__tests__/utils";
import { ListProfileService } from "@repo/core/domain/service/ListProfilesService";
import { NonEmptyString } from "@repo/core/domain/valueObject/NonEmptyString";
import { InMemoryProfileRepository } from "@repo/core/infrastructure/repository/InMemoryProfileRepository";

describe("list profiles service", () => {
  it("should give all availables profiles", async () => {
    const profileRepository = new InMemoryProfileRepository([
      createFixtureProfile("Profile 1"),
      createFixtureProfile("Profile 2", "1234"),
    ]);
    const service = new ListProfileService(profileRepository);

    const results = await service.execute();

    expect(results).toEqual([
      expect.objectContaining({
        name: NonEmptyString.create("Profile 1"),
      }),
      expect.objectContaining({
        name: NonEmptyString.create("Profile 2"),
      }),
    ]);
  });
});
