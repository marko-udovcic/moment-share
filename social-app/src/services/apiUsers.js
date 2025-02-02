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
