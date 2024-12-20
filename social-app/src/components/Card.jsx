import PropTypes from "prop-types";

export default function Card({ children, className, style }) {
  return (
    <div className={`${className}`} style={style}>
      {children}
    </div>
  );
}
Card.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
  style: PropTypes.any,
  onClick: PropTypes.func,
};
