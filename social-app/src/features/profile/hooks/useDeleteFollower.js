import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFollower as removeFollowerApi } from "../services/apiFollowers";
export function useDeleteFollower() {
  const queryClient = useQueryClient();
  const { mutate: removeFollower, isLoading } = useMutation({
    mutationFn: removeFollowerApi,
    onSuccess: () => queryClient.invalidateQueries(["myFollowers"]),
  });
  return { removeFollower, isLoading };
}
