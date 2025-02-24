import PropTypes from "prop-types";
import Button from "./Button";

function ConfirmDelete({ onCloseModal, onConfirm, name }) {
  const handleDelete = () => {
    onConfirm();
    onCloseModal();
  };
  return (
    <div>
      <h2 className="text-xl font-semibold text-white">Are you sure that you want delete this {name}?</h2>
      <div className="flex flex-col lg:flex-row-reverse">
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button className="text-white mt-4" onClick={onCloseModal}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

ConfirmDelete.propTypes = {
  onCloseModal: PropTypes.func,
  onConfirm: PropTypes.func,
  name: PropTypes.string,
};

export default ConfirmDelete;
