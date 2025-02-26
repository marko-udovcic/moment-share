import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment as deleteCommentApi } from "../../../services/apiComments";
export function useDeleteComment() {
  const queryClient = useQueryClient();
  const { mutate: deleteComment, isLoading } = useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: () => queryClient.invalidateQueries(["comments"]),
  });
  return { deleteComment, isLoading };
}
