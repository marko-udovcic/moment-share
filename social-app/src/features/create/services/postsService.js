// import axios from "axios";

// const appApi = axios.create({
//   baseURL: "http://localhost:5000",
// });

// export async function addPost(post) {
//   return await appApi.post("/posts", post);
// }
import supabase from "../../../services/supaBaseClient";

export async function addPost(post) {
  const { data, error } = await supabase.from("posts").insert([post]).select();
  if (error) throw new Error(error.message);
  return data;
}
