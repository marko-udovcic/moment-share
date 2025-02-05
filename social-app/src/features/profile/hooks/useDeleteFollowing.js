import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFollowing as removeFollowingApi } from "../services/apiFollowers";
export function useDeleteFollowing() {
  const queryClient = useQueryClient();
  const { mutate: removeFollowing, isLoading } = useMutation({
    mutationFn: removeFollowingApi,
    onSuccess: () => queryClient.invalidateQueries(["myFollowing"]),
  });
  return { removeFollowing, isLoading };
}
