import PropTypes from "prop-types";
import Button from "../../../components/ui/Button";
import { IoPersonAddOutline } from "react-icons/io5";
import H3 from "./reusable/H3";
import Reveal from "../../../components/ui/Reveal";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useFollowers } from "../hooks/useFollowers";
import { useProfile } from "../../../context/ProfileContext";
import { useFollowing } from "../hooks/useFollowing";

export default function Header({ handleShowFollowers, handleShowFollowing, setShowDiscover }) {
  const { myMoments } = useProfile();
  const { user: currentUser } = useCurrentUser();
  const { myFollowing, isLoading } = useFollowing(currentUser?.id);
  const { myFollowers } = useFollowers(currentUser?.id);

  if (!currentUser || isLoading) return <div>Loading...</div>;

  const listFollowingLength = myFollowing?.length;
  const listFollowersLength = myFollowers?.length;
  const myMomentsLength = myMoments?.length;

  function closeDiscover() {
    setShowDiscover((prev) => !prev);
  }

  return (
    <div className="z-50 min-h-24 sm:px-28 2xl:ml-[10rem]">
      <div className="grid-col-3 grid grid-rows-3 gap-2 bg-slate-900 p-5 sm:grid-cols-3 sm:grid-rows-2 sm:gap-2">
        <Reveal>
          <H3 className="sm:text-xl">{currentUser.username}</H3>
        </Reveal>

        <Button className="edit-btn" onClick={closeDiscover}>
          <IoPersonAddOutline className="text-3xl" />
        </Button>

        <H3 className="row-start-2">{myMomentsLength} Post</H3>
        <H3 className="row-start-2" onClick={handleShowFollowers}>
          {listFollowersLength} Followers
        </H3>
        <H3 className="row-start-2 rounded-lg" onClick={handleShowFollowing}>
          {listFollowingLength} Following
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
};
