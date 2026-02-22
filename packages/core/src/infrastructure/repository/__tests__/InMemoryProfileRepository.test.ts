import { Profile } from "@repo/core/domain/entity/Profile";
import { createFixtureProfile } from "@repo/core/domain/service/__tests__/utils";
import { Id } from "@repo/core/domain/valueObject/Id";
import { NonEmptyString } from "@repo/core/domain/valueObject/NonEmptyString";
import { Pin } from "@repo/core/domain/valueObject/Pin";
import { InMemoryProfileRepository } from "@repo/core/infrastructure/repository/InMemoryProfileRepository";

describe("in memory profile repository", () => {
  it("should obtain a specific profile by id", async () => {
    const profileRepository = new InMemoryProfileRepository([
      new Profile({
        id: Id.fromString("profile_01988f7a-3e5b-70c9-bab5-3e8817be5922"),
        name: NonEmptyString.create("Profile 1"),
        pin: null,
      }),
    ]);

    const result = await profileRepository.get(
      Id.fromString("profile_01988f7a-3e5b-70c9-bab5-3e8817be5922"),
    );
    expect(result).toEqual(
      expect.objectContaining({
        name: NonEmptyString.create("Profile 1"),
      }),
    );
  });

  it("should fail if the profile isn't found", () => {
    const profileRepository = new InMemoryProfileRepository([]);

    const callback = () =>
      profileRepository.get(
        Id.fromString("profile_01988f7a-3e5b-70c9-bab5-3e8817be5922"),
      );

    expect(callback).toThrow();
  });

  it("should save a profile", async () => {
    const profileRepository = new InMemoryProfileRepository([]);

    await profileRepository.save(createFixtureProfile("Profile 1", "1234"));

    expect(await profileRepository.list()).toEqual([
      {
        id: expect.any(Id),
        name: NonEmptyString.create("Profile 1"),
        pin: Pin.create("1234"),
      },
    ]);
  });

  it("should list profiles", async () => {
    const profileRepository = new InMemoryProfileRepository([
      createFixtureProfile("Profile 1", null),
      createFixtureProfile("Profile 2", "1234"),
    ]);

    const results = await profileRepository.list();

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
