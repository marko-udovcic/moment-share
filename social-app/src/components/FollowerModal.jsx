import PropTypes from "prop-types";
import ListUsers from "./ListUsers";

export function FollowerModal({ setShowFollowers, setShowFollowing, showFollowers, showFollowing }) {
  return (
    <div className="z-0 mb-[5rem] min-h-full">
      <div
        className="relative m-auto max-h-[30rem] max-w-[calc(100%)] rounded-xl bg-gray-800 blur-none filter-none
          lg:max-w-[calc(50%-100px)] xl:max-w-[calc(40%-100px)]"
      >
        <div className="relative m-5 flex h-20 items-center justify-center bg-gray-800">
          <h2 className="text-lg font-semibold text-white">{showFollowers ? "Followers" : "Following"}</h2>
          <button
            className="absolute right-0 top-0 m-4 text-5xl text-cyan-50"
            onClick={() => (showFollowers ? setShowFollowers(false) : setShowFollowing(false))}
          >
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
