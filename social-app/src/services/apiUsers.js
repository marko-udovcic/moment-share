import supabase from "./supaBaseClient";
export async function getAllFollowers(id) {
  const { data, error } = await supabase
    .from("followers")
    .select("follower_id,follower:users!fk_follower(username)")
    .eq("following_id", id);
  if (error) {
    throw error;
  }
  const formattedData = data.map((follower) => ({
    username: follower.follower?.username,
    id: follower.follower_id,
  }));
  return formattedData;
}

export async function getAllFollowing(id) {
  const { data, error } = await supabase
    .from("followers")
    .select("following_id,following:users!fk_following(username)")
    .eq("follower_id", id);
  if (error) {
    throw error;
  }
  const formattedData = data.map((following) => ({
    username: following.following?.username,
    id: following.following_id,
  }));
  return formattedData;
}

export async function getDiscoverUsers(followList) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .not("id", "in", `(${followList.join(",")})`);

  if (error) {
    console.error("Error fetching discover users:", error);
  }
  return data;
}
export async function getUserById(userId) {
  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();

  if (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }

  return data;
}

export async function followUser(followerId, followingId) {
  const { data, error } = await supabase
    .from("followers")
    .insert([{ follower_id: followerId, following_id: followingId }]);

  if (error) {
    console.error("Error following user:", error);
    return null;
  }

  return data;
}
export async function unfollowUser(followerId, followingId) {
  const { data, error } = await supabase
    .from("followers")
    .delete()
    .eq("follower_id", followerId)
    .eq("following_id", followingId);

  if (error) {
    console.error("Error following user:", error);
    return null;
  }

  return data;
}

export async function getUserStatus(userId, targetUserId) {
  if (!userId || !targetUserId) return { error: "Missing user IDs" };

  const { data, error } = await supabase
    .from("followers")
    .select("*")
    .eq("follower_id", userId)
    .eq("following_id", targetUserId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching user status:", error);
    return { error };
  }

  return { isFollowing: !!data };
}
