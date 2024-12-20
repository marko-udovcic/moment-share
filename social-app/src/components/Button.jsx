import PropTypes from "prop-types";
export default function Button({ children, removeOnClick, className }) {
  return (
    <button onClick={removeOnClick} className={`${className}`}>
      {children}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.string,
  removeOnClick: PropTypes.func,
  className: PropTypes.node,
};
