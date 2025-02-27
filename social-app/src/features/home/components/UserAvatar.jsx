import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

function UserAvatar({ userId, username, textColor, children }) {
  return (
    <div className="flex items-center p-4 rounded-lg shadow-sm">
      <NavLink to={`/user/${userId}/${username}`} className="flex items-center gap-4 mr-4">
        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
          <h2>{username[0]}</h2>
        </div>

        <h2 className={`font-semibold ${textColor} text-xl text-left`}>{username}</h2>
      </NavLink>
      {children}
    </div>
  );
}
UserAvatar.propTypes = {
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default UserAvatar;
