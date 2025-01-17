import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../services/apiAuth";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      navigate("/login");
    },
  });
  return { signUp, isLoading };
}
