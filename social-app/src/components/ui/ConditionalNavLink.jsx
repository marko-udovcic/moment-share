import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

export function ConditionalNavLink({ to, isEnabled, children, className }) {
  return (
    <NavLink
      to={isEnabled ? to : "#"}
      className={`${className} ${
        isEnabled ? " hover:underline cursor-pointer" : "text-gray-400 pointer-events-none cursor-not-allowed" }`}
    >
      {children}
    </NavLink>
  );
}

ConditionalNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
