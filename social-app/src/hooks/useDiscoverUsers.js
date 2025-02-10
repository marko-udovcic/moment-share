import { useQuery } from "@tanstack/react-query";
import { getDiscoverUsers as getDiscoverUsersApi } from "../services/apiUsers";
import { useFollowing } from "../features/profile/hooks/useFollowing";
import { useFollowers } from "../features/profile/hooks/useFollowers";

export function useDiscoverUsers(currentUserId) {
  const { myFollowing, isLoading: isLoadingFollowing } = useFollowing(currentUserId);
  const { myFollowers, isLoading: isLoadingFollowers } = useFollowers(currentUserId);

  let followList = [];
  if (myFollowing && myFollowers) {
    followList = [
      currentUserId,
      ...myFollowing.map((user) => String(user.id)),
      ...myFollowers.map((user) => String(user.id)),
    ];
  }

  const {
    data: discoverUsers,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["discoverUsers", ...followList],
    queryFn: () => getDiscoverUsersApi(followList),
    enabled: followList.length > 0,
  });

  if (error) {
    console.error("Error fetching discover users:", error);
  }
  if (isLoadingFollowing || isLoadingFollowers) {
    return { discoverUsers: [], isLoading: true };
  }

  return { discoverUsers: discoverUsers || [], isLoading: isLoading };
}
