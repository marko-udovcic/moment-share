import PropTypes from "prop-types";
import moment from "moment";
import { ConditionalNavLink } from "../../../components/ui/ConditionalNavLink";
import { useProfileStore } from "../../../context/zustand/useProfileStore";
function UserInfo({ username, date, momentAuthorId }) {
  const { currentUser } = useProfileStore();
  const formattedDate = moment(date).calendar();
  const link = `/user/${momentAuthorId}/${username}`;
  const isEnabled = currentUser.id !== momentAuthorId;

  return (
    <section className="flex items-center gap-3 mb-3">
      <div className="w-[3rem] h-[3rem] rounded-full bg-primary flex justify-center items-center">
        <h2 className="text-2xl uppercase font-bold text-white">{username[0]}</h2>
      </div>
      <ConditionalNavLink className="text-white" to={link} isEnabled={isEnabled}>
        <div className="flex items-center">
          <h2 className="text-xl">{username}</h2>
        </div>
      </ConditionalNavLink>
      <div className="flex items-center mt-1">
        <h2 className="text-lg text-gray-500">{formattedDate}</h2>
      </div>
    </section>
  );
}

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
  momentAuthorId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default UserInfo;
