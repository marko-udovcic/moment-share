import { useQuery } from "@tanstack/react-query";
import { getAllFollowing as getAllFollowingApi } from "../../../services/apiUsers";

export function useFollowing(currentUserId) {
  const {
    data: myFollowing,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["myFollowing", currentUserId],
    queryFn: () => getAllFollowingApi(currentUserId),
    enabled: Boolean(currentUserId),
  });
  if (error) {
    console.error("Error kod followera je : ", error);
  }

  return { myFollowing, isLoading };
}
