import PropTypes from "prop-types";
import Button from "../../../components/ui/Button";
import { IoPersonAddOutline } from "react-icons/io5";
import { useProfile } from "../../../context/ProfileContext";
import H3 from "./reusable/H3";
import { useCurrentUser } from "../hooks/useCurrentUser";
import Reveal from "../../../components/ui/Reveal";
export default function Header({
  handleShowFollowers,
  handleShowFollowing,
  listMomentsSize,
  setShowDiscover,
}) {
  const { listFollowing, listFollowers } = useProfile();
  const listFollowingLength = listFollowing.length;
  const listFollowersLength = listFollowers.length;
  const currentUser = useCurrentUser();
  return (
    <div className="z-50 min-h-24 sm:px-28 2xl:ml-[10rem]">
      <div className="grid-col-3 grid grid-rows-3 gap-2 bg-slate-900 p-5 sm:grid-cols-3 sm:grid-rows-2 sm:gap-2">
        <Reveal>
          <H3 className="sm:text-xl">{currentUser.username}</H3>
        </Reveal>

        <Button className="edit-btn" onClick={() => setShowDiscover((prev) => !prev)}>
          <IoPersonAddOutline className="text-3xl" />
        </Button>

        <H3 className="row-start-2">{listMomentsSize} Post</H3>
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
  listMomentsSize: PropTypes.number,
  setShowDiscover: PropTypes.func,
};
