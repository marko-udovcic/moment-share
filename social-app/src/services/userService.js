import axios from "axios";

const appApi = axios.create({
  baseURL: "http://localhost:5000",
});
export async function getAllUsers() {
  const response = await appApi.get("/allusers");
  return response.data;
}

export async function addUser(user) {
  return await appApi.post("/allusers", user);
}
export async function addFollowingUser(user) {
  return await appApi.post("/following", user);
}

export async function updateUser(user) {
  return await appApi.patch(`/allusers/${user.id}`, user);
}

export async function deleteUser(id) {
  return await appApi.delete(`/allusers/${id}`);
}
