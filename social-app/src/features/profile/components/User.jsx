import Button from "../../../components/ui/Button";
import PropTypes from "prop-types";

export default function User({ follower, showFollowers, onClick }) {
  return (
    <>
      <li className="m-4 flex items-center justify-between p-3">
        <h2 className="text-lg font-semibold text-white">{follower.username}</h2>
        <Button
          onClick={() => onClick(follower.id)}
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
  onClick: PropTypes.func.isRequired,
};
