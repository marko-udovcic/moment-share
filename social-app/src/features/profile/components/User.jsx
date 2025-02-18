import Button from "../../../components/ui/Button";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
export default function User({ follower, showFollowers, onClick }) {
  return (
    <>
      <li className="m-4 flex items-center justify-between p-3">
        <NavLink key={follower.id} to={`/user/${follower.id}/${follower.username}`}>
          <h2 className="text-lg font-semibold text-white underline">{follower.username}</h2>
        </NavLink>

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
