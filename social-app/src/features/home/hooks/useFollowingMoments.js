import { getFollowingMoments as getFollowingMomentsApi } from "../../../services/apiMoments";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useProfileStore } from "../../../context/zustand/useProfileStore";
export function useFollowingMoments() {
  const { currentUser: user } = useProfileStore();

  const { data: moments } = useSuspenseQuery({
    queryKey: ["followingMoments", user.id],
    queryFn: () => getFollowingMomentsApi(user.id),
    enabled: !!user,
  });

  return moments;
}
