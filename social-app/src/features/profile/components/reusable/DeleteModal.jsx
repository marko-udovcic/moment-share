import PropTypes from "prop-types";

export default function DeleteModal({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">{children}</div>
    </div>
  );
}

DeleteModal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
};
