import { Skeleton } from "primereact/skeleton";
import { ProfileToDropdownTemplate } from "@/domains/profiles/selection/components/ProfileToDropdownTemplate";
import { useProfileSelector } from "@/domains/profiles/selection/hooks/useProfileSelector";
import { ImportantDropdown } from "@/shared/components/organisms/ImportantDropdown";
import { useTranslation } from "@/shared/hooks/useTranslation";

export const ProfileSelector = () => {
  const { t } = useTranslation();

  const {
    getProfileFromValue,
    selectProfile,
    options,
    currentProfileValue,
    openCreateProfile,
  } = useProfileSelector();

  if (currentProfileValue === null) {
    return <Skeleton height="1.5rem" width="18rem" className="my-3" />;
  }

  return (
    <ImportantDropdown
      options={options}
      value={currentProfileValue}
      onSelect={selectProfile}
      onCreate={openCreateProfile}
      createLabel={t("profile.action.create")}
      itemTemplate={({ value }) => (
        <ProfileToDropdownTemplate
          profile={getProfileFromValue(value)}
          isSelected={value === currentProfileValue}
        />
      )}
    />
  );
};
