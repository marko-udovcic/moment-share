import supabase from "./supaBaseClient";
export async function getUserMoments(id) {
  const { data, error } = await supabase.from("posts").select("*").eq("user_id", id);
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
