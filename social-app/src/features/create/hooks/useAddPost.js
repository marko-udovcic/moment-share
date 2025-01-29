import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost as addPostApi } from "../services/postsService";
import { useNavigate } from "react-router-dom";
export function useAddPost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: addPost } = useMutation({
    mutationFn: addPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["myMoments"]);
      navigate("/profile", { replace: true });
    },
    onError: (error) => {
      console.error("Error adding post:", error.message);
      alert(`Failed to add post: ${error.message}`);
    },
  });

  return addPost;
}
