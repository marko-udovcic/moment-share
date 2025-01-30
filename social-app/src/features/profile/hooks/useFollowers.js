import { useQuery } from "@tanstack/react-query";
import { getAllFollowers as getAllFollowersApi } from "../../../services/apiUsers";

export function useFollowers(currentUserId) {
  const {
    data: myFollowers,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["myFollowers"],
    queryFn: () => getAllFollowersApi(currentUserId),
    enabled: Boolean(currentUserId),
  });
  if (error) {
    console.error("Error kod followera je : ", error);
  }

  return { myFollowers, isLoading };
}
