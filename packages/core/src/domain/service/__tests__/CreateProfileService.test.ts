import { CreateProfileService } from "@repo/core/domain/service/CreateProfileService";
import { Id } from "@repo/core/domain/valueObject/Id";
import { NonEmptyString } from "@repo/core/domain/valueObject/NonEmptyString";
import { Pin } from "@repo/core/domain/valueObject/Pin";
import { InMemoryProfileRepository } from "@repo/core/infrastructure/repository/InMemoryProfileRepository";

describe("create profile service", () => {
  it("should create a profile", async () => {
    const profileRepository = new InMemoryProfileRepository([]);
    const service = new CreateProfileService(profileRepository);

    const result = await service.execute({
      name: NonEmptyString.create("Profile 1"),
      pin: Pin.create("1234"),
    });

    expect(result).toEqual({
      id: expect.any(Id),
      name: NonEmptyString.create("Profile 1"),
      pin: Pin.create("1234"),
    });
  });
});
