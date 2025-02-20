import PropTypes from "prop-types";

const variants = {
  secondary: `text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition 
    duration-200 ease-in-out dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600`,
};
export default function Button({ children, onClick, className, disabled, variant }) {
  return (
    <button onClick={onClick} className={`${className} ${variants[variant]}`} disabled={disabled}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
};
