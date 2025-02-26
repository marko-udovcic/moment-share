import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addComment as addCommentApi } from "../../../services/apiComments";
import { useProfileStore } from "../../../context/zustand/useProfileStore";

export function useAddComment() {
  const { currentUser } = useProfileStore();
  const queryClient = useQueryClient();

  const { mutate: addComment } = useMutation({
    mutationFn: ({ postId, content, parentId }) => {
      return addCommentApi(currentUser?.id, postId, content, parentId === undefined ? null : parentId)
        .then(() => {
          return { postId };
        })
        .catch((error) => {
          console.error("API Error:", error);
          throw error;
        });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["comments", data.postId]);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  return addComment;
}
