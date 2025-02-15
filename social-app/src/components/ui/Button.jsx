import PropTypes from "prop-types";

export default function Button({ children, onClick, className, disabled }) {
  return (
    <button onClick={onClick} className={`${className}`} disabled={disabled}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
