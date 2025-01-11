import { useProfile } from "../../../context/ProfileContext";
export function useDeleteUser() {
  const { setListFollowing } = useProfile();

  async function deleteUser(id, url) {
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to delete user");
    } else {
      console.log("User successfully deleted");
      setListFollowing((prev) => prev.filter((user) => user.id !== id));
    }
  }
  return { deleteUser };
}
