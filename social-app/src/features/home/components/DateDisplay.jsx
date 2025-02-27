import PropTypes from "prop-types";

function DateDisplay({ date, textColor, isMobile }) {
  return isMobile ? (
    <p className={`text-sm ${textColor} opacity-50 mt-1 sm:hidden`}>{date}</p>
  ) : (
    <p className={`hidden sm:block absolute bottom-0 left-0 m-4 text-sm ${textColor}`}>{date}</p>
  );
}

DateDisplay.propTypes = {
  date: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default DateDisplay;
