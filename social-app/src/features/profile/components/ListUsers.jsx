import PropTypes from "prop-types";
import User from "./User";
import { useFollowers } from "../hooks/useFollowers";
import { useProfileStore } from "../../../context/zustand/useProfileStore";
import { useFollowing } from "../hooks/useFollowing";
import { useDeleteFollowing } from "../hooks/useDeleteFollowing";
import { useDeleteFollower } from "../hooks/useDeleteFollower";
export default function ListUsers({ showFollowers, showFollowing }) {
  const { currentUser } = useProfileStore();
  const { myFollowers } = useFollowers(currentUser?.id);
  const { myFollowing, isLoading } = useFollowing(currentUser?.id);
  const { removeFollowing } = useDeleteFollowing();
  const { removeFollower } = useDeleteFollower();

  if (isLoading || !myFollowers) {
    return <p>Loading...</p>;
  }
  const showList = showFollowers ? myFollowers : myFollowing;

  function removeClickedFollower(userId) {
    const confirm = window.confirm("are you sure you want remove user");
    if (!confirm) return;
    if (showFollowers) {
      removeFollower({ currentUserId: currentUser?.id, followerId: userId });
    } else {
      removeFollowing({ currentUserId: currentUser?.id, followingId: userId });
    }
  }
  return (
    <ul className="max-h-[20rem] overflow-y-auto p-3">
      {showList.map((follower) => (
        <User
          follower={follower}
          key={follower.id}
          showFollowers={showFollowers}
          showFollowing={showFollowing}
          onClick={removeClickedFollower}
        />
      ))}
    </ul>
  );
}

ListUsers.propTypes = {
  showFollowers: PropTypes.bool,
  showFollowing: PropTypes.bool,
};
