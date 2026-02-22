import { Clock } from "@/app/components/Clock/Clock";
import { ProfileSelector } from "@/domains/profiles";
import { Toolbar } from "@/shared/components/molecules/Toolbar";

export const AppToolbar = () => (
  <Toolbar start={<Clock />} center={<ProfileSelector />} />
);
