import Button from "./ui/Button";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useIsFollowed } from "../hooks/useIsFollowed";
import { useDebounce } from "../hooks/useDebounce";
import { useFollowStateChange } from "../hooks/useFollowStateChange";

function FollowButton({ activeUserId }) {
  const { isFollowedData } = useIsFollowed(activeUserId);

  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    if (isFollowedData !== undefined) {
      setIsFollowing(isFollowedData);
    }
  }, [isFollowedData]);
  const debouncedIsFollowing = useDebounce(isFollowing, 500);
  useFollowStateChange(debouncedIsFollowing, isFollowedData, activeUserId);

  const handleFollowing = () => {
    setIsFollowing((prev) => !prev);
  };
  return (
    <Button
      className={`text-white col-start-1 col-end-3 row-start-3 lg:col-start-3 lg:row-start-1 lg:w-[50%] w-[70%] bottom-5
        ${isFollowing ? "bg-transparent border-[1px] border-white " : "bg-blue-500"} p-2 rounded-md font-semibold`}
      onClick={handleFollowing}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
FollowButton.propTypes = {
  activeUserId: PropTypes.string.isRequired,
};

export default FollowButton;
