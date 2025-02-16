import { useEffect } from "react";
import { useFollowUser } from "./useFollowUser";
import { useUnfollowUser } from "./useUnfollowUser";
import { useProfileStore } from "../context/zustand/useProfileStore";
export function useFollowStateChange(debouncedIsFollowing, isFollowedData, followingId) {
  const { currentUser } = useProfileStore();
  const followerId = currentUser?.id;
  const { followUser } = useFollowUser();
  const { unfollowUser } = useUnfollowUser();

  useEffect(() => {
    if (isFollowedData === undefined || followingId === undefined) return;

    if (debouncedIsFollowing !== isFollowedData && debouncedIsFollowing !== null) {
      if (debouncedIsFollowing) {
        followUser({ followerId, followingId });
      } else {
        unfollowUser({ followerId, followingId });
      }
    }
  }, [debouncedIsFollowing, isFollowedData, followerId, followingId, unfollowUser, followUser]);
}
