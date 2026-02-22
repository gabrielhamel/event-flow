import { useEffect, useState } from "react";
import type { Profile } from "@repo/core/domain/entity/Profile";
import type { Id } from "@repo/core/domain/valueObject/Id";
import type { NonEmptyString } from "@repo/core/domain/valueObject/NonEmptyString";
import type { Pin } from "@repo/core/domain/valueObject/Pin";
import { usePromptPin } from "@/domains/pin";
import { useCreateProfileMutation } from "@/domains/profiles/create/hooks/useCreateProfileMutation";
import { useListProfilesQuery } from "@/domains/profiles/selection/hooks/useListProfilesQuery";
import { useContainer } from "@/shared/hooks/useContainer";

export const useProfile = () => {
  const { promptPin } = usePromptPin();

  const container = useContainer();
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);

  const { profiles } = useListProfilesQuery();
  const createProfileMutation = useCreateProfileMutation();

  const setDefaultProfile = () => {
    const [defaultAvailableProfile] = profiles;

    if (!currentProfile && defaultAvailableProfile) {
      setCurrentProfile(defaultAvailableProfile);
    }
  };

  useEffect(setDefaultProfile, [currentProfile, profiles]);

  const createProfile = async ({
    name,
    pin,
  }: {
    name: NonEmptyString;
    pin: Pin | null;
  }) => {
    const newProfile = await createProfileMutation({ name, pin });
    setCurrentProfile(newProfile);

    return newProfile;
  };

  const getProfile = (id: Id) => {
    const profile = profiles.find((p) => p.id.equals(id));
    if (!profile) {
      throw new Error(`Could not find profile with id ${id.toString()}`);
    }

    return profile;
  };

  const changeProfile = (id: Id) => {
    const profile = getProfile(id);

    if (profile.hasPin()) {
      promptPin({
        callback: (success) => {
          if (success) {
            setCurrentProfile(profile);
          }
        },
        validator: (input) =>
          container.service.profile.canChangeProfile.execute({
            inputPin: input,
            profile,
          }),
      });
    } else {
      setCurrentProfile(profile);
    }
  };

  return {
    changeProfile,
    createProfile,
    currentProfile,
    getProfile,
    profiles,
  };
};
