import { useQueryClient, useMutation } from "@tanstack/react-query";
import { followUser as followUserApi } from "../services/apiUsers";
export function useFollowUser() {
  const queryClient = useQueryClient();
  const { mutate: followUser } = useMutation({
    mutationFn: ({ followerId, followingId }) => followUserApi(followerId, followingId),
    onSuccess: ({ followerId }) => {
      queryClient.invalidateQueries(["discoverUsers"]);
      queryClient.invalidateQueries(["myFollowing", followerId]);
    },
  });

  return { followUser };
}
