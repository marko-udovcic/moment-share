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
