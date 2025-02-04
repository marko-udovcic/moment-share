import { useQuery } from "@tanstack/react-query";
import { getDiscoverUsers as getDiscoverUsersApi } from "../services/apiUsers";

export function useDiscoverUsers(currentUserId, myFollowing, myFollowers) {
  let followList = [];
  followList = [
    ...followList,
    currentUserId,
    ...myFollowing.map((user) => String(user.id)),
    ...myFollowers.map((user) => String(user.id)),
  ];
  const {
    data: discoverUsers,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["discoverUsers", ...followList],
    queryFn: () => getDiscoverUsersApi(followList),
  });
  if (error) {
    console.error("Error fetching discover users:", error);
  }
  if (!discoverUsers) {
    console.log("nema discoverUsers");
  }
  return { discoverUsers, isLoading };
}
