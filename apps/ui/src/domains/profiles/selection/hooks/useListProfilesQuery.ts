import { useQuery } from "@tanstack/react-query";
import { useContainer } from "@/shared/hooks/useContainer";

export const useListProfilesQuery = () => {
  const container = useContainer();

  const { data } = useQuery({
    initialData: [],
    queryFn: () => container.service.profile.list.execute(),
    queryKey: ["profiles"],
  });

  return { profiles: data };
};
