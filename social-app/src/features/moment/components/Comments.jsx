import { useGetComments } from "../hooks/useGetComments";
import PropTypes from "prop-types";
import { useDeleteComment } from "../hooks/useDeleteComment";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { useAddComment } from "../hooks/useAddComment";

function Comments({ momentId }) {
  const [activeComment, setActiveComment] = useState(null);
  const { data: allComments, isLoading } = useGetComments(momentId);
  const { deleteComment } = useDeleteComment();
  const [backendComments, setBackendComments] = useState([]);

  const addCommentMutation = useAddComment();

  useEffect(() => {
    if (allComments) setBackendComments(allComments);
  }, [allComments]);
  if (isLoading) return <div>Loading...</div>;
  const rootComments = backendComments?.filter((comment) => comment.parent_id === null);

  const addComment = (content, parentId) => {
    addCommentMutation({
      postId: momentId,
      content,
      parentId,
    });
  };

  return (
    <div className="pb-20 mb-32 lg:mb-0">
      <h2 className="my-4 text-xl font-semibold">Comments</h2>
      <div>
        {rootComments.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center mb-4">
            <h2 className="text-xl mb-2">No comments yet.</h2>
            <h3 className="text-sm text-gray-400">Be the first to comment!</h3>
          </div>
        )}

        <div className="hidden md:block">
          <CommentForm
            submitLabel="Add Comment"
            handleSubmit={addComment}
            setActiveComment={setActiveComment}
          />
        </div>

        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            comments={backendComments}
            activeComment={activeComment}
            addComment={addComment}
            deleteComment={deleteComment}
            setActiveComment={setActiveComment}
          />
        ))}
        {activeComment?.type !== "replying" && (
          <div className="md:hidden fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full sm:w-[75%] p-4">
            <CommentForm
              submitLabel="Add Comment"
              handleSubmit={addComment}
              setActiveComment={setActiveComment}
            />
          </div>
        )}
      </div>
    </div>
  );
}
Comments.propTypes = {
  momentId: PropTypes.string.isRequired,
};

export default Comments;
