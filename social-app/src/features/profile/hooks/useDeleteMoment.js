import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMoment as deleteMomentApi } from "../../../services/apiMoments";
export function useDeleteMoment() {
  const queryClient = useQueryClient();
  const { mutate: deleteMoment, isLoading } = useMutation({
    mutationFn: deleteMomentApi,
    onSuccess: () => queryClient.invalidateQueries(["myMoments"]),
  });
  return { deleteMoment, isLoading };
}
