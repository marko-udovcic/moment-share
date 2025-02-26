import { useState } from "react";
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";
import moment from "moment";
import { useProfileStore } from "../../../context/zustand/useProfileStore";
import { MdOutlineDelete } from "react-icons/md";
import { ConditionalNavLink } from "../../../components/ui/ConditionalNavLink";

function Comment({ comment, comments, activeComment, setActiveComment, addComment, deleteComment }) {
  const { currentUser } = useProfileStore();
  const [showReplies, setShowReplies] = useState(false);
  const replies = comments.filter((c) => c.parent_id === comment.id);
  const canDelete = currentUser?.id === comment.user_id;
  const isReplying = activeComment?.type === "replying" && activeComment.id === comment.id;
  console.log("comment", comment.users);
  console.log("comment", comment.user_id);
  return (
    <div className="flex flex-col p-4 rounded-lg shadow-md lg:bg-gray-800 text-white">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 h-10 w-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
          {comment.users?.username?.[0] || "U"}
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <ConditionalNavLink
              className="text-white"
              isEnabled={currentUser.id !== comment.user_id}
              to={`/user/${comment.user_id}/${comment.users?.username}`}
            >
              <div className="text-[16px] font-semibold mr-4">{comment.users?.username || "Unknown"}</div>
            </ConditionalNavLink>
            <div className="text-[14px] text-gray-400">{moment(comment.created_at).calendar()}</div>
          </div>
          <div className="mt-2 text-sm break-all whitespace-normal">{comment.content}</div>

          <div className="flex items-center space-x-4 mt-2 text-sm text-blue-400">
            <div
              className="cursor-pointer hover:underline"
              onClick={() => setActiveComment({ id: comment.id, type: "replying" })}
            >
              Reply
            </div>

            {replies.length > 0 && (
              <div className="cursor-pointer hover:underline" onClick={() => setShowReplies(!showReplies)}>
                {showReplies ? "Hide Replies" : `Show Replies (${replies.length})`}
              </div>
            )}
            {canDelete && (
              <div className="cursor-pointer text-lg" onClick={() => deleteComment(comment.id)}>
                <MdOutlineDelete />
              </div>
            )}
          </div>
        </div>
      </div>
      {isReplying && (
        <CommentForm
          submitLabel="Reply"
          handleCancel={() => setActiveComment(null)}
          hasCancelButton={true}
          setActiveComment={setActiveComment}
          handleSubmit={(text) => addComment(text, comment.id)}
        />
      )}
      {showReplies && replies.length > 0 && (
        <div className="mt-5 xl:ml-8 border-l border-gray-600 pl-4">
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              comments={comments}
              activeComment={activeComment}
              addComment={addComment}
              deleteComment={deleteComment}
              setActiveComment={setActiveComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    parent_id: PropTypes.any,
    user_id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    users: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      parent_id: PropTypes.any,
      user_id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      users: PropTypes.shape({
        username: PropTypes.string,
      }),
    }),
  ).isRequired,
  activeComment: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
  }),
  setActiveComment: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default Comment;
