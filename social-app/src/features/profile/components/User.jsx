import Button from "../../../components/ui/Button";
import PropTypes from "prop-types";
import { useDeleteUser } from "../hooks/useDeleteUser";

const BASE_URL = "http://localhost:5000";

export default function User({ follower, showFollowers }) {
  const { deleteUser } = useDeleteUser();

  function removeClickedFollower(id) {
    const confirm = window.confirm("are you sure you want remove user");
    if (!confirm) return;
    const url = showFollowers ? `${BASE_URL}/followme` : `${BASE_URL}/following`;
    deleteUser(id, url);
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
