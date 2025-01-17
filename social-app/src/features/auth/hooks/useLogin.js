import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log("ispis useraa", user);
      navigate("/profile");
    },
    onError: (err) => {
      console.log("Error from login is", err);
    },
  });
  return { login, isLoading };
}
