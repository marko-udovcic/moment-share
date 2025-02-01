import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      navigate("/login");
    },
  });
  return { signUp, isLoading };
}
