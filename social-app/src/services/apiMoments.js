import supabase from "./supaBaseClient";
export async function getUserMoments() {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      throw userError;
    }
    const { data, error } = await supabase.from("posts").select("*").eq("user_id", user.id);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching user moments:", error.message);
    throw error;
  }
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
