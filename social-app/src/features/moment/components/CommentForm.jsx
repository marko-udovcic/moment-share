import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../../components/ui/Button";

function CommentForm({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = "",
  handleCancel,
  setActiveComment,
}) {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText(initialText);
    setActiveComment(null);
  };

  return (
    <form onSubmit={onSubmit} className="w-full mx-auto space-y-4 mt-2">
      <textarea
        className="w-full p-3 border border-gray-500 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500
          min-h-[120px] resize-y transition duration-200 ease-in-out outline-none bg-secondary"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
      ></textarea>
      <div className="flex gap-2 justify-end">
        <button
          className={`px-4 py-2 font-medium rounded-lg transition duration-200 ease-in-out ${
            isTextareaDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-600"
            }`}
          disabled={isTextareaDisabled}
        >
          {submitLabel}
        </button>
        {hasCancelButton && (
          <Button className="px-4 py-2" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
  hasCancelButton: PropTypes.bool,
  initialText: PropTypes.string,
  handleCancel: PropTypes.func,
  setActiveComment: PropTypes.func,
};

export default CommentForm;
