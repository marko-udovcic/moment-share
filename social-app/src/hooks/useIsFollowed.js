import { useQuery } from "@tanstack/react-query";
import { getUserStatus as getUserStatusApi } from "../services/apiUsers";
import { useProfileStore } from "../context/zustand/useProfileStore";

export function useIsFollowed(targetUserId) {
  const { currentUser } = useProfileStore();
  const currentUserId = currentUser?.id;

  const { data, isLoading } = useQuery({
    queryKey: ["isFollowed", currentUserId, targetUserId],
    queryFn: () => getUserStatusApi(currentUserId, targetUserId),
    enabled: !!currentUserId && !!targetUserId,
  });

  const isFollowedData = data?.isFollowing;

  return { isFollowedData, isLoading };
}
