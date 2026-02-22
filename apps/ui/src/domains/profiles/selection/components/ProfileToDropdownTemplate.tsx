import type { Profile } from "@repo/core/domain/entity/Profile";

export const ProfileToDropdownTemplate = ({
  profile,
  isSelected,
}: {
  profile: Profile;
  isSelected: boolean;
}) => (
  <div className="flex items-center gap-4 w-80">
    <span className="pi pi-user" />
    <div className="flex-1 text-ellipsis overflow-hidden">
      {profile.name.toString()}
    </div>
    {isSelected ? (
      <span className="pi pi-check-circle text-success before:font-bold" />
    ) : (
      profile.hasPin() && (
        <span className="pi pi-lock before:font-bold text-secondary" />
      )
    )}
  </div>
);
