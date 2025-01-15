import PropTypes from "prop-types";

function AuthError({ children }) {
  return <span className="text-red-500 text-sm">{children}</span>;
}

AuthError.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthError;
