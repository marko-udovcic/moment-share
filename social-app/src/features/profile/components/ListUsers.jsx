import PropTypes from "prop-types";
import User from "./User";
import { useProfile } from "../../../context/ProfileContext";
import { useFollowers } from "../hooks/useFollowers";
import { useProfileStore } from "../../../context/zustand/useProfileStore";
import { useFollowing } from "../hooks/useFollowing";
export default function ListUsers({ showFollowers, showFollowing }) {
  const { listFollowing } = useProfile();
  const { currentUser } = useProfileStore();
  const { myFollowers } = useFollowers(currentUser?.id);
  const { myFollowing } = useFollowing(currentUser?.id);
  console.log("myFollowing", myFollowing);
  const showList = showFollowers ? myFollowers : myFollowing;

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
