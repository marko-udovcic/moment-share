import supabase from "../../../services/supaBaseClient";
export async function removeFollower({ currentUserId, followerId }) {
  const { error } = await supabase
    .from("followers")
    .delete()
    .eq("follower_id", followerId)
    .eq("following_id", currentUserId);

  if (error) {
    throw error;
  }
}

export async function removeFollowing({ currentUserId, followingId }) {
  const { error } = await supabase
    .from("followers")
    .delete()
    .eq("follower_id", currentUserId)
    .eq("following_id", followingId);

  if (error) {
    throw error;
  }
}
