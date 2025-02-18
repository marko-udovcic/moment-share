import { useQueryClient, useMutation } from "@tanstack/react-query";
import { unfollowUser as unfollowUserApi } from "../services/apiUsers";
export function useUnfollowUser() {
  const queryClient = useQueryClient();
  const { mutate: unfollowUser } = useMutation({
    mutationFn: ({ followerId, followingId }) => unfollowUserApi(followerId, followingId),
    onSuccess: ({ followerId, followingId }) => {
      queryClient.invalidateQueries(["discoverUsers"]);
      queryClient.invalidateQueries(["myFollowing", followerId]);
      queryClient.invalidateQueries(["myFollowers", followerId]);
      queryClient.invalidateQueries(["isFollowed", followerId, followingId]);
    },
  });

  return { unfollowUser };
}
