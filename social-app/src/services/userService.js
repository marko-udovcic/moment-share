import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:5000",
});
export async function getAllUsers() {
  const response = await userApi.get("/allusers");
  return response.data;
}

export async function addUser(user) {
  return await userApi.post("/allusers", user);
}
export async function addFollowingUser(user) {
  return await userApi.post("/following", user);
}

export async function updateUser(user) {
  return await userApi.patch(`/allusers/${user.id}`, user);
}

export async function deleteUser(id) {
  return await userApi.delete(`/allusers/${id}`);
}
