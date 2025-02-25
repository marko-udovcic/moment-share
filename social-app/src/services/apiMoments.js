import supabase from "./supaBaseClient";
export async function getUserMoments(id) {
  const { data, error } = await supabase.from("posts").select("*").eq("user_id", id);
  if (error) {
    throw error;
  }
  return data;
}
export async function getUserMoment(blogId) {
  const { data, error } = await supabase.from("posts").select("*").eq("id", blogId);
  if (error) {
    throw error;
  }
  return data;
}

export async function deleteMoment(id) {
  try {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error deleting moment:", error.message);
    throw error;
  }
}
export async function getFollowingMoments(userId) {
  const { data, error } = await supabase
    .from("posts")
    .select("id, content, created_at, color, users: user_id (username, id)")
    .in(
      "user_id",
      (await supabase.from("followers").select("following_id").eq("follower_id", userId)).data?.map(
        (f) => f.following_id,
      ) || [],
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching following moments:", error.message);
    return [];
  }

  return data;
}
