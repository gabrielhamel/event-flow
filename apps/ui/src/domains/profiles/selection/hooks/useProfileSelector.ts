import type { Profile } from "@repo/core/domain/entity/Profile";
import { Id } from "@repo/core/domain/valueObject/Id";
import { useCreateProfile } from "@/domains/profiles/create/hooks/useCreateProfile";
import { useProfile } from "@/domains/profiles/selection/hooks/useProfile";
import type { ImportantDropdownOption } from "@/shared/components/organisms/ImportantDropdown";

export const mapProfileToDropdownOption = (
  profile: Profile,
): ImportantDropdownOption => ({
  label: profile.name.toString(),
  value: profile.id.toString(),
});

export const useProfileSelector = () => {
  const { currentProfile, profiles, changeProfile, getProfile, createProfile } =
    useProfile();
  const { openCreateProfileForm } = useCreateProfile();

  const valueToId = (value: ImportantDropdownOption["value"]) =>
    Id.fromString(value);

  const selectProfile = (value: ImportantDropdownOption["value"]) => {
    const id = valueToId(value);

    changeProfile(id);
  };

  const getProfileFromValue = (value: ImportantDropdownOption["value"]) =>
    getProfile(valueToId(value));

  const openCreateProfile = () => {
    openCreateProfileForm({
      onSuccess: createProfile,
    });
  };

  const options = profiles.map(mapProfileToDropdownOption);

  const currentProfileValue = currentProfile?.id.toString() ?? null;

  return {
    currentProfileValue,
    getProfileFromValue,
    openCreateProfile,
    options,
    selectProfile,
  };
};
