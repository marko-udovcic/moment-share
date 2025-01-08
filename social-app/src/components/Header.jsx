import PropTypes from "prop-types";

import Button from "./ui/Button";
import { IoPersonAddOutline } from "react-icons/io5";
import { useProfile } from "../context/ProfileContext";
export default function Header({
  handleShowFollowers,
  handleShowFollowing,
  listMomentsSize,
  setShowDiscover,
}) {
  const { listFollowing, listFollowers } = useProfile();
  const listFollowingLength = listFollowing.length;
  const listFollowersLength = listFollowers.length;
  return (
    <div className="z-50 min-h-24 sm:px-28">
      <div className="grid-col-3 grid grid-rows-3 gap-2 bg-slate-900 p-5 sm:grid-cols-3 sm:grid-rows-2 sm:gap-2">
        <h3 className="text-2xl font-semibold text-white sm:text-xl">m.udovcic</h3>
        <Button className="edit-btn" onClick={() => setShowDiscover((prev) => !prev)}>
          <IoPersonAddOutline className="text-3xl" />
        </Button>

        <h3 className="row-start-2 cursor-pointer text-xl font-semibold text-white">
          {listMomentsSize} Post
        </h3>
        <h3
          className="row-start-2 cursor-pointer text-xl font-semibold text-white"
          onClick={handleShowFollowers}
        >
          {listFollowersLength} Followers
        </h3>
        <h3
          onClick={handleShowFollowing}
          className="row-start-2 cursor-pointer rounded-lg text-xl font-semibold text-white"
        >
          {listFollowingLength} Following
        </h3>
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
