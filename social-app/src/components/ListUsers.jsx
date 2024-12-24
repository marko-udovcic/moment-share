import PropTypes from "prop-types";
import User from "./User";
import { myContext } from "../context/Context";
import { useContext } from "react";

export default function ListUsers({ showFollowers, showFollowing }) {
  const { listFollowing, listFollowers } = useContext(myContext);

  const showList = showFollowers ? listFollowers : listFollowing;
  return (
    <ul className="max-h-[20rem] overflow-y-auto p-3">
      {showList.map((follower) => (
        <User
          follower={follower}
          key={follower.id}
          showFollowers={showFollowers}
          showFollowing={showFollowing}
        />
      ))}
    </ul>
  );
}

ListUsers.propTypes = {
  showFollowers: PropTypes.bool,
  showFollowing: PropTypes.bool,
};
