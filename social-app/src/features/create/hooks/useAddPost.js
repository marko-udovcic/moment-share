import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost } from "../services/postsService";

export function useAddPost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("Error adding post:", error.message);
      alert(`Failed to add post: ${error.message}`);
    },
  });

  return mutation.mutate;
}
