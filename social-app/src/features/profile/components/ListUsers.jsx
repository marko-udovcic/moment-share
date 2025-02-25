import { useState } from "react";
import PropTypes from "prop-types";
import User from "./User";
import { useFollowers } from "../hooks/useFollowers";
import { useProfileStore } from "../../../context/zustand/useProfileStore";
import { useFollowing } from "../hooks/useFollowing";
import { useDeleteFollowing } from "../hooks/useDeleteFollowing";
import { useDeleteFollower } from "../hooks/useDeleteFollower";
import DeleteModal from "./reusable/DeleteModal";
import ConfirmDelete from "../../../components/ui/ConfirmDelete";

export default function ListUsers({ showFollowers, showFollowing }) {
  const { currentUser } = useProfileStore();
  const { myFollowers } = useFollowers(currentUser?.id);
  const { myFollowing, isLoading } = useFollowing(currentUser?.id);
  const { removeFollowing } = useDeleteFollowing();
  const { removeFollower } = useDeleteFollower();

  const [selectedUser, setSelectedUser] = useState(null);

  if (isLoading || !myFollowers) {
    return <p>Loading...</p>;
  }

  const showList = showFollowers ? myFollowers : myFollowing;

  function confirmDelete(user) {
    setSelectedUser(user);
  }

  function handleDelete() {
    if (!selectedUser) return;
    if (showFollowers) {
      removeFollower({ currentUserId: currentUser?.id, followerId: selectedUser.id });
    } else {
      removeFollowing({ currentUserId: currentUser?.id, followingId: selectedUser.id });
    }
    setSelectedUser(null);
  }

  return (
    <div>
      <ul className="max-h-[20rem] overflow-y-auto p-3">
        {showList.map((user) => (
          <User
            follower={user}
            key={user.id}
            showFollowers={showFollowers}
            showFollowing={showFollowing}
            onClick={() => confirmDelete(user)}
          />
        ))}
      </ul>

      <DeleteModal isOpen={!!selectedUser}>
        {selectedUser && (
          <ConfirmDelete name="user" onCloseModal={() => setSelectedUser(null)} onConfirm={handleDelete} />
        )}
      </DeleteModal>
    </div>
  );
}

ListUsers.propTypes = {
  showFollowers: PropTypes.bool,
  showFollowing: PropTypes.bool,
};
