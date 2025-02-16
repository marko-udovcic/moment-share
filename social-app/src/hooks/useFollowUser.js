import { useQueryClient, useMutation } from "@tanstack/react-query";
import { followUser as followUserApi } from "../services/apiUsers";
export function useFollowUser() {
  const queryClient = useQueryClient();
  const { mutate: followUser } = useMutation({
    mutationFn: ({ followerId, followingId }) => followUserApi(followerId, followingId),
    onSuccess: ({ followerId, followingId }) => {
      queryClient.refetchQueries({ queryKey: ["isFollowed", followerId, followingId] });
      queryClient.refetchQueries({ queryKey: ["myFollowers", followingId] });
      queryClient.invalidateQueries({ queryKey: ["myFollowing", followerId] });
      queryClient.invalidateQueries({ queryKey: ["discoverUsers"] });
    },
  });

  return { followUser };
}
