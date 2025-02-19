import supabase from "./supaBaseClient";

export async function getCommentsByMomentId(momentId) {
  try {
    let { data, error } = await supabase
      .from("comments")
      .select(
        `
        *,
        users (username)
      `,
      )
      .eq("post_id", momentId);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

export async function addComment(userId, postId, content, parentId) {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ user_id: userId, content: content, parent_id: parentId, post_id: postId }]);

  if (error) {
    console.error("Error following user:", error);
    return null;
  }
}
