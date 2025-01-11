import PropTypes from "prop-types";

function H3({ children, className = "", onClick }) {
  return (
    <h3 className={`cursor-pointer text-xl font-semibold text-white ${className}`} onClick={onClick}>
      {children}
    </h3>
  );
}

H3.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default H3;
