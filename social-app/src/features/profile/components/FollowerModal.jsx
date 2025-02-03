import PropTypes from "prop-types";
import ListUsers from "./ListUsers";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

export function FollowerModal({ setShowFollowers, setShowFollowing, showFollowers, showFollowing }) {
  const close = () => {
    if (showFollowers) {
      setShowFollowers(false);
    } else if (showFollowing) {
      setShowFollowing(false);
    }
  };

  const ref = useOutsideClick(close);
  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div
        className="w-[90%] max-w-[500px] rounded-xl bg-gray-800 blur-none filter-none transition-all duration-300 lg:w-[70%]"
        ref={ref}
      >
        <div className="relative m-5 flex h-20 items-center justify-center bg-gray-800">
          <h2 className="text-lg font-semibold text-white">{showFollowers ? "Followers" : "Following"}</h2>
          <button className="absolute right-0 top-0 m-4 text-5xl text-cyan-50" onClick={close}>
            &times;
          </button>
        </div>
        <ListUsers showFollowers={showFollowers} showFollowing={showFollowing} />
      </div>
    </div>
  );
}

FollowerModal.propTypes = {
  setShowFollowers: PropTypes.any,
  setShowFollowing: PropTypes.any,
  showFollowers: PropTypes.bool,
  showFollowing: PropTypes.bool,
};
