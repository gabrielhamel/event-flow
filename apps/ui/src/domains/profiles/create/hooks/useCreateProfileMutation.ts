import type { NonEmptyString } from "@repo/core/domain/valueObject/NonEmptyString";
import type { Pin } from "@repo/core/domain/valueObject/Pin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContainer } from "@/shared/hooks/useContainer";

export const useCreateProfileMutation = () => {
  const container = useContainer();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: { name: NonEmptyString; pin: Pin | null }) =>
      container.service.profile.create.execute(params),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profiles"] }),
  });

  return mutation.mutateAsync;
};
