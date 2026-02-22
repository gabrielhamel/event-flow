import { createFixtureProfile } from "@repo/core/domain/service/__tests__/utils";
import { CanChangeProfileService } from "@repo/core/domain/service/CanChangeProfileService";
import { CreateProfileService } from "@repo/core/domain/service/CreateProfileService";
import { ListProfileService } from "@repo/core/domain/service/ListProfilesService";
import { InMemoryProfileRepository } from "@repo/core/infrastructure/repository/InMemoryProfileRepository";
import { getAllByRole } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { ProfileSelector } from "@/domains/profiles";
import { render, screen } from "@/tests/testingLibrary";

describe("profile selector", () => {
  it("should have a selected profile by default", async () => {
    const profileRepository = new InMemoryProfileRepository([
      createFixtureProfile("Profile 1"),
    ]);

    const { findByTestId } = render(<ProfileSelector />, {
      service: {
        profile: {
          create: new CreateProfileService(profileRepository),
          list: new ListProfileService(profileRepository),
        },
      },
    });

    const profileSelectedName = await findByTestId("profile-selected-name");
    expect(profileSelectedName).toHaveTextContent("Profile 1");
  });

  it("should change the profile", async () => {
    const profileRepository = new InMemoryProfileRepository([
      createFixtureProfile("Profile 1"),
      createFixtureProfile("Profile 2"),
    ]);

    const { getByTestId } = render(<ProfileSelector />, {
      service: {
        profile: {
          canChangeProfile: new CanChangeProfileService(),
          create: new CreateProfileService(profileRepository),
          list: new ListProfileService(profileRepository),
        },
      },
    });

    await selectProfile("Profile 2");

    const profileSelectedName = getByTestId("profile-selected-name");
    expect(profileSelectedName).toHaveTextContent("Profile 2");
  });

  it("should login on a locked profile", async () => {
    const profileRepository = new InMemoryProfileRepository([
      createFixtureProfile("Profile 1"),
      createFixtureProfile("Profile 2", "1234"),
    ]);

    const { getByTestId } = render(<ProfileSelector />, {
      service: {
        profile: {
          canChangeProfile: new CanChangeProfileService(),
          create: new CreateProfileService(profileRepository),
          list: new ListProfileService(profileRepository),
        },
      },
    });

    await selectProfile("Profile 2");
    await inputPin("1234");

    const profileSelectedName = getByTestId("profile-selected-name");
    expect(profileSelectedName).toHaveTextContent("Profile 2");
  });

  it("should create a profile and switch on it", async () => {
    const profileRepository = new InMemoryProfileRepository([
      createFixtureProfile("Profile 1"),
    ]);

    const { getByText, getByTestId, getByLabelText } = render(
      <ProfileSelector />,
      {
        service: {
          profile: {
            create: new CreateProfileService(profileRepository),
            list: new ListProfileService(profileRepository),
          },
        },
      },
    );

    await openDropdown();

    const newProfileButton = getByText("New profile");
    await userEvent.click(newProfileButton);

    const nameInput = getByTestId("name-input");
    await userEvent.type(nameInput, "Profile 2");

    const createButton = getByLabelText("Create");
    await userEvent.click(createButton);

    const profileSelectedName = getByTestId("profile-selected-name");
    expect(profileSelectedName).toHaveTextContent("Profile 2");
  });

  it("should create a profile with a PIN and switch on it", async () => {
    const profileRepository = new InMemoryProfileRepository([
      createFixtureProfile("Profile 1"),
    ]);

    const { getByText, getByTestId, getByLabelText } = render(
      <ProfileSelector />,
      {
        service: {
          profile: {
            create: new CreateProfileService(profileRepository),
            list: new ListProfileService(profileRepository),
          },
        },
      },
    );

    await openDropdown();

    const newProfileButton = getByText("New profile");
    await userEvent.click(newProfileButton);

    await inputPin("1234");
    const nameInput = getByTestId("name-input");
    await userEvent.type(nameInput, "Profile 2");

    const createButton = getByLabelText("Create");
    await userEvent.click(createButton);

    const profileSelectedName = getByTestId("profile-selected-name");
    expect(profileSelectedName).toHaveTextContent("Profile 2");
  });
});

const inputPin = async (pin: string) => {
  const pinInputContainer = screen.getByTestId("pin-input-container");
  const inputs = getAllByRole(pinInputContainer, "textbox");

  for (let i = 0; i < pin.length; i++) {
    await userEvent.type(inputs[i]!, pin[i]!);
  }
};

const openDropdown = async () => {
  const profileSelectedName = await screen.findByTestId(
    "profile-selected-name",
  );
  await userEvent.click(profileSelectedName);
};

const selectProfile = async (profileName: string) => {
  await openDropdown();

  const selectProfile2Button = screen.getByText(profileName);
  await userEvent.click(selectProfile2Button);
};
