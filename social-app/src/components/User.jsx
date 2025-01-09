import { useProfile } from "../context/ProfileContext";
import Button from "./ui/Button";
import PropTypes from "prop-types";

export default function User({ follower, showFollowers }) {
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

  function removeClickedFollower(id) {
    const confirm = window.confirm("are you sure you want remove user");
    if (!confirm) return;
    showFollowers
      ? deleteUser(Number(id), "http://localhost:5000/followme")
      : deleteUser(id, "http://localhost:5000/following");
  }
  return (
    <>
      <li className="m-4 flex items-center justify-between p-3">
        <h2 className="text-lg font-semibold text-white">{follower.username}</h2>
        <Button
          onClick={() => removeClickedFollower(follower.id)}
          className="rounded-lg bg-gray-500 p-2 text-white hover:bg-gray-400"
        >
          {showFollowers ? "Remove" : "Following"}
        </Button>
      </li>
    </>
  );
}

User.propTypes = {
  follower: PropTypes.object,
  showFollowers: PropTypes.bool,
  showFollowing: PropTypes.bool,
};
