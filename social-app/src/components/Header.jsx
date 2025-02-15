import PropTypes from "prop-types";
import Button from "./ui/Button";
import { IoPersonAddOutline } from "react-icons/io5";
import H3 from "../features/profile/components/reusable/H3";
import Reveal from "./ui/Reveal";
import { useCurrentUser } from "../features/profile/hooks/useCurrentUser";
import { useFollowers } from "../features/profile/hooks/useFollowers";
import { useProfile } from "../context/ProfileContext";
import { useFollowing } from "../features/profile/hooks/useFollowing";

import FollowButton from "./FollowButton";

export default function Header({
  handleShowFollowers,
  handleShowFollowing,
  setShowDiscover,
  profileUser = {},
}) {
  const { user: currentUser } = useCurrentUser();
  const isProfileUserEmpty = !profileUser || Object.keys(profileUser).length === 0;
  const activeUser = isProfileUserEmpty ? currentUser : profileUser;

  const { myMoments } = useProfile();
  const { myFollowing, isLoading } = useFollowing(activeUser.id);
  const { myFollowers } = useFollowers(activeUser.id);

  const listFollowersLength = myFollowers?.length;
  const momentsLength = myMoments?.length;

  if (!currentUser || isLoading) return <div>Loading...</div>;

  function closeDiscover() {
    setShowDiscover((prev) => !prev);
  }

  return (
    <div className="z-50 min-h-24 md:px-28 2xl:ml-[10rem]">
      <div className="grid-col-3 grid grid-rows-3 gap-2 bg-slate-900 p-5 sm:grid-cols-3 sm:grid-rows-2 sm:gap-2">
        <Reveal>
          <H3 className="sm:text-xl">{activeUser.username}</H3>
        </Reveal>

        {isProfileUserEmpty ? (
          <Button className="edit-btn" onClick={closeDiscover}>
            <IoPersonAddOutline className="text-3xl" />
          </Button>
        ) : (
          <FollowButton activeUserId={activeUser.id} />
        )}

        <H3 className="row-start-2">{momentsLength} Post</H3>
        <H3 className="row-start-2" onClick={handleShowFollowers}>
          {listFollowersLength} Followers
        </H3>
        <H3 className="row-start-2 rounded-lg" onClick={handleShowFollowing}>
          {myFollowing?.length} Following
        </H3>
      </div>
    </div>
  );
}

Header.propTypes = {
  listFollowers: PropTypes.array,
  listFollowing: PropTypes.array,
  handleShowFollowers: PropTypes.func,
  handleShowFollowing: PropTypes.func,
  setShowDiscover: PropTypes.func,
  profileUser: PropTypes.object,
};
