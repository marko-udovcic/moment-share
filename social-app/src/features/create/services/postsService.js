import axios from "axios";

const appApi = axios.create({
  baseURL: "http://localhost:5000",
});

export async function addPost(post) {
  return await appApi.post("/posts", post);
}
