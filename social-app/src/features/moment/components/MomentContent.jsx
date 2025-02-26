import PropTypes from "prop-types";
function MomentContent({ userMoment }) {
  return <p className="text-[1rem] xl:text-lg text-white break-words">{userMoment[0].content}</p>;
}
MomentContent.propTypes = {
  userMoment: PropTypes.array.isRequired,
};

export default MomentContent;
