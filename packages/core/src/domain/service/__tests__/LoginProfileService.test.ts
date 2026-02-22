import { createFixtureProfile } from "@repo/core/domain/service/__tests__/utils";
import { CanChangeProfileService } from "@repo/core/domain/service/CanChangeProfileService";
import { Pin } from "@repo/core/domain/valueObject/Pin";

describe("login profile service", () => {
  it("should reject if the given pin is invalid", () => {
    const profile = createFixtureProfile("Profile 1", "1234");
    const service = new CanChangeProfileService();

    const results = service.execute({
      inputPin: Pin.create("4321"),
      profile,
    });

    expect(results).toBeFalsy();
  });

  it("should accept a valid pin", () => {
    const profile = createFixtureProfile("Profile 1", "1234");
    const service = new CanChangeProfileService();

    const results = service.execute({
      inputPin: Pin.create("1234"),
      profile,
    });

    expect(results).toBeTruthy();
  });

  it("should accept if the profile doesn't have a Pin", () => {
    const profile = createFixtureProfile("Profile 1", null);
    const service = new CanChangeProfileService();

    const results = service.execute({
      inputPin: Pin.create("1234"),
      profile,
    });

    expect(results).toBeTruthy();
  });

  it("should reject if the profile have a PIN and no pin was given in input", () => {
    const profile = createFixtureProfile("Profile 1", "1234");
    const service = new CanChangeProfileService();

    const results = service.execute({
      inputPin: null,
      profile,
    });

    expect(results).toBeFalsy();
  });
});
