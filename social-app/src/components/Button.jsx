import PropTypes from "prop-types";
export default function Button({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={`${className}`}>
      {children}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.node,
};
